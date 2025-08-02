import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { database } from "@/db";
import { artwork } from "@/db/schema";
import { z } from "zod";
import { auth } from "@/utils/auth";

const addArtworkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  price: z
    .number()
    .min(0, "Price must be positive")
    .max(999999, "Price is too high"),
  imageData: z.string().optional(),
  imageMimeType: z.string().optional(),
  isForSale: z.boolean(),
});

export type AddArtworkInput = z.infer<typeof addArtworkSchema>;

export const addArtwork = createServerFn({ method: "POST" })
  .validator(addArtworkSchema)
  .handler(async ({ data }) => {
    const request = getWebRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session.user.isAdmin) {
      throw new Error("Admin access required");
    }

    const newArtwork = await database
      .insert(artwork)
      .values({
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        price: Math.round(data.price * 100), // Store price in cents
        imageData: data.imageData,
        imageMimeType: data.imageMimeType,
        isForSale: data.isForSale,
        userId: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newArtwork[0];
  });
