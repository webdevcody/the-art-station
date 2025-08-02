import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";
import { artwork, user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getArtworkById = createServerFn({ method: "GET" })
  .validator((artworkId: string) => artworkId)
  .handler(async ({ data: artworkId }) => {
    const result = await database
      .select({
        id: artwork.id,
        title: artwork.title,
        description: artwork.description,
        price: artwork.price,
        userId: artwork.userId,
        createdAt: artwork.createdAt,
        updatedAt: artwork.updatedAt,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
      .from(artwork)
      .leftJoin(user, eq(artwork.userId, user.id))
      .where(eq(artwork.id, artworkId))
      .limit(1);

    if (!result[0]) {
      return null;
    }

    return {
      ...result[0],
      price: result[0].price / 100, // Convert from cents to dollars
    };
  });