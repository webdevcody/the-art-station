import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";
import { artwork } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "~/utils/auth";
import { getWebRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const updateArtworkSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  price: z.number().min(0),
  imageData: z.string().optional(),
  imageMimeType: z.string().optional(),
});

export const updateArtwork = createServerFn({ method: "POST" })
  .validator(updateArtworkSchema)
  .handler(async ({ data }) => {
    const request = getWebRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    const updateData: any = {
      title: data.title,
      description: data.description,
      price: Math.round(data.price * 100), // Convert to cents
      updatedAt: new Date(),
    };

    // Only update image if new one is provided
    if (data.imageData && data.imageMimeType) {
      updateData.imageData = data.imageData;
      updateData.imageMimeType = data.imageMimeType;
    }

    const updatedArtwork = await database
      .update(artwork)
      .set(updateData)
      .where(eq(artwork.id, data.id))
      .returning();

    if (updatedArtwork.length === 0) {
      throw new Error("Artwork not found");
    }

    return updatedArtwork[0];
  });