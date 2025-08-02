import Stripe from "stripe";
import { order, orderItem, artwork } from "../../../db/schema";
import { env } from "../../../utils/env";
import { database } from "~/db";
import { eq, inArray, sql, and } from "drizzle-orm";
import { createServerFileRoute } from "@tanstack/react-start/server";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

export const ServerRoute = createServerFileRoute(
  "/api/webhooks/stripe"
).methods({
  POST: async ({ request }) => {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
      if (!endpointSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
      }

      if (!sig) {
        throw new Error("No stripe signature found");
      }

      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(
        JSON.stringify({ error: "Webhook signature verification failed" }),
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        try {
          // Extract metadata from the session
          const itemsMetadata = session.metadata?.items;
          if (!itemsMetadata) {
            throw new Error("No items metadata found in session");
          }

          const items = JSON.parse(itemsMetadata) as Array<{
            artworkId: string;
            title: string;
            price: number;
            quantity: number;
          }>;

          // Check availability of all artworks before processing
          const artworkIds = items.map((item) => item.artworkId);
          const availableArtworks = await database
            .select()
            .from(artwork)
            .where(
              and(
                inArray(artwork.id, artworkIds),
                eq(artwork.isForSale, true),
                eq(artwork.isSold, false)
              )
            );

          // Check if all requested artworks are still available
          const availableArtworkIds = availableArtworks.map((art) => art.id);
          const unavailableArtworks = items.filter(
            (item) => !availableArtworkIds.includes(item.artworkId)
          );

          if (unavailableArtworks.length > 0) {
            console.warn(
              `Some artworks are no longer available for session ${session.id}:`,
              unavailableArtworks.map((item) => item.artworkId)
            );

            // Immediately refund the customer
            await stripe.refunds.create({
              payment_intent: session.payment_intent as string,
              reason: "requested_by_customer",
            });

            // Send email to customer explaining the situation
            // await sendUnavailableEmail(session.customer_details?.email); // This function is not defined in the original file

            // Create order with failed status for unavailable items
            const [newOrder] = await database
              .insert(order)
              .values({
                id: session.id,
                customerName: session.customer_details?.name || "Unknown",
                customerEmail:
                  session.customer_details?.email || "unknown@example.com",
                customerAddress:
                  JSON.stringify(session.customer_details?.address) ||
                  "No address provided",
                totalAmount: Math.round(
                  items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  ) * 100
                ),
                stripePaymentIntentId: session.payment_intent as string,
                status: "refunded",
                createdAt: new Date(),
                updatedAt: new Date(),
              })
              .returning();

            // Log the issue for manual refund processing
            console.error(
              `Order ${session.id} failed: Some artworks are no longer available. ` +
                `Customer: ${session.customer_details?.email}. ` +
                `Payment Intent: ${session.payment_intent}. ` +
                `Manual refund required.`
            );

            return new Response(
              JSON.stringify({
                received: true,
                error: "Some artworks are no longer available",
                unavailableArtworks: unavailableArtworks.map(
                  (item) => item.artworkId
                ),
              })
            );
          }

          // Calculate total amount
          const totalAmount = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          // Create the order
          const [newOrder] = await database
            .insert(order)
            .values({
              id: session.id,
              customerName: session.customer_details?.name || "Unknown",
              customerEmail:
                session.customer_details?.email || "unknown@example.com",
              customerAddress:
                JSON.stringify(session.customer_details?.address) ||
                "No address provided",
              totalAmount: Math.round(totalAmount * 100), // Convert to cents
              stripePaymentIntentId: session.payment_intent as string,
              status: "processed",
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .returning();

          // Create order items
          const orderItemsData = items.map((item) => ({
            id: `${session.id}_${item.artworkId}`,
            orderId: newOrder.id,
            artworkId: item.artworkId,
            quantity: item.quantity,
            priceAtTime: Math.round(item.price * 100), // Convert to cents
            createdAt: new Date(),
          }));

          try {
            await database.insert(orderItem).values(orderItemsData);
          } catch (error) {
            console.error("Error inserting order items:", error);
            await database
              .update(order)
              .set({ status: "failed", updatedAt: new Date() })
              .where(eq(order.id, newOrder.id));
            return new Response(JSON.stringify({ received: true }));
          }

          // Mark all artwork items as sold by setting isForSale to false
          // Use a more specific condition to avoid race conditions
          const updateResult = await database
            .update(artwork)
            .set({
              isForSale: false,
              isSold: true,
              updatedAt: new Date(),
            })
            .where(
              and(
                inArray(artwork.id, artworkIds),
                eq(artwork.isForSale, true),
                eq(artwork.isSold, false)
              )
            );

          // Check if all artworks were successfully updated
          if (updateResult.rowCount !== artworkIds.length) {
            console.warn(
              `Not all artworks were updated for session ${session.id}. ` +
                `Expected: ${artworkIds.length}, Updated: ${updateResult.rowCount}`
            );
          }

          console.log(`Order created successfully: ${newOrder.id}`);
          return new Response(JSON.stringify({ received: true }));
        } catch (error) {
          console.error("Error processing checkout.session.completed:", error);
          return new Response(
            JSON.stringify({ error: "Failed to process order" }),
            { status: 500 }
          );
        }

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment succeeded:", paymentIntent.id);
        return new Response(JSON.stringify({ received: true }));

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", failedPayment.id);
        return new Response(JSON.stringify({ received: true }));

      default:
        console.log(`Unhandled event type: ${event.type}`);
        return new Response(JSON.stringify({ received: true }));
    }
  },
});
