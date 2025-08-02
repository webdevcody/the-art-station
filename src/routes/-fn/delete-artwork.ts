import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";
import { artwork } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "~/utils/auth";
import { getWebRequest } from "@tanstack/react-start/server";

export const deleteArtwork = createServerFn({ method: "POST" })
  .validator((artworkId: string) => artworkId)
  .handler(async ({ data: artworkId }) => {
    const request = getWebRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    // Delete the artwork
    const deletedArtwork = await database
      .delete(artwork)
      .where(eq(artwork.id, artworkId))
      .returning();

    if (deletedArtwork.length === 0) {
      throw new Error("Artwork not found");
    }

    return { success: true };
  });