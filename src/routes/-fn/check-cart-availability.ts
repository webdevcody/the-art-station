import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { database } from "~/db";
import { artwork } from "~/db/schema";
import { eq, inArray, and } from "drizzle-orm";

const checkCartAvailabilitySchema = z.object({
  artworkIds: z.array(z.string()),
});

export type CheckCartAvailabilityInput = z.infer<
  typeof checkCartAvailabilitySchema
>;

export const checkCartAvailability = createServerFn({ method: "POST" })
  .validator(checkCartAvailabilitySchema)
  .handler(async ({ data }) => {
    try {
      const { artworkIds } = data;

      if (artworkIds.length === 0) {
        return { availableArtworkIds: [], unavailableArtworkIds: [] };
      }

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

      const availableArtworkIds = availableArtworks.map((art) => art.id);
      const unavailableArtworkIds = artworkIds.filter(
        (id) => !availableArtworkIds.includes(id)
      );

      return { availableArtworkIds, unavailableArtworkIds };
    } catch (error) {
      console.error("Error checking cart availability:", error);
      throw new Error("Failed to check cart availability");
    }
  });
