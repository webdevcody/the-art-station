import Stripe from "stripe";
import { order, orderItem, artwork } from "../../../db/schema";
import { env } from "../../../utils/env";
import { database } from "~/db";
import { sql } from "drizzle-orm";
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

          await database.insert(orderItem).values(orderItemsData);

          // Mark all artwork items as sold by setting isForSale to false
          const artworkIds = items.map((item) => item.artworkId);
          await database
            .update(artwork)
            .set({
              isForSale: false,
              isSold: true,
              updatedAt: new Date(),
            })
            .where(sql`${artwork.id} = ANY(${artworkIds})`);

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
