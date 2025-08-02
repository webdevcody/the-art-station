import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";
import { artwork } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getArtworkById = createServerFn({ method: "GET" })
  .validator((artworkId: string) => artworkId)
  .handler(async ({ data: artworkId }) => {
    const result = await database.query.artwork.findFirst({
      where: eq(artwork.id, artworkId),
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      price: result.price / 100, // Convert from cents to dollars
    };
  });
