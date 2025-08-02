import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import Stripe from "stripe";
import { env } from "../../utils/env";
import { database } from "~/db";
import { artwork } from "~/db/schema";
import { eq, inArray, and } from "drizzle-orm";

const createCheckoutSessionSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      artworkId: z.string(),
      title: z.string(),
      price: z.number(),
      imageData: z.string().nullable(),
      quantity: z.number(),
    })
  ),
});

export type CreateCheckoutSessionInput = z.infer<
  typeof createCheckoutSessionSchema
>;

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator(createCheckoutSessionSchema)
  .handler(async ({ data }) => {
    try {
      const { items } = data;

      if (items.length === 0) {
        throw new Error("No items in cart");
      }

      // Check availability of all artworks before creating checkout session
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
        const unavailableTitles = unavailableArtworks.map((item) => item.title);
        throw new Error(
          `Some items are no longer available: ${unavailableTitles.join(", ")}`
        );
      }

      // Initialize Stripe with proper error handling
      if (!env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY environment variable is not set");
      }

      const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-07-30.basil",
      });

      const lineItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: item.imageData
              ? [`${env.BASE_URL}/api/images/${item.artworkId}`]
              : undefined,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      }));
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${env.BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.BASE_URL}/cart`,
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        metadata: {
          items: JSON.stringify(
            items.map((item) => ({
              artworkId: item.artworkId,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
            }))
          ),
        },
      });

      return { sessionId: session.id, url: session.url };
    } catch (error) {
      console.error("Error creating checkout session:", error);

      // Re-throw the original error if it's already an Error instance
      if (error instanceof Error) {
        throw error;
      }

      // Otherwise, throw a generic error
      throw new Error("Failed to create checkout session");
    }
  });
