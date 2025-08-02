import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";
import { artwork, user } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const getArtworks = createServerFn({ method: "GET" })
  .handler(async () => {
    const artworks = await database
      .select({
        id: artwork.id,
        title: artwork.title,
        description: artwork.description,
        price: artwork.price,
        imageData: artwork.imageData,
        imageMimeType: artwork.imageMimeType,
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
      .orderBy(desc(artwork.createdAt));

    return artworks.map(item => ({
      ...item,
      price: item.price / 100, // Convert from cents back to dollars
    }));
  });