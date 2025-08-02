import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";
import { artwork } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";

export const getFeaturedArtworks = createServerFn({ method: "GET" }).handler(
  async () => {
    const artworks = await database.query.artwork.findMany({
      where: and(
        eq(artwork.isForSale, true),
        eq(artwork.isSold, false)
      ),
      with: {
        user: true,
      },
      orderBy: [desc(artwork.createdAt)],
      limit: 6, // Show 6 featured artworks
    });
    
    return artworks.map((item) => ({
      ...item,
      price: item.price / 100, // Convert from cents to dollars
    }));
  }
);