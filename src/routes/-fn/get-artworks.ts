import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";

export const getArtworks = createServerFn({ method: "GET" }).handler(
  async () => {
    const artworks = await database.query.artwork.findMany();
    return artworks.map((item) => ({
      ...item,
      price: item.price / 100,
    }));
  }
);
