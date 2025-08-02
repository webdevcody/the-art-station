import { database } from "@/db";
import { artwork } from "@/db/schema";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

export const ServerRoute = createServerFileRoute(
  "/api/images/$artworkId"
).methods({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const artworkId = url.pathname.split("/").pop();

    try {
      // Fetch the artwork from the database
      const artworkData = await database
        .select({
          imageData: artwork.imageData,
          imageMimeType: artwork.imageMimeType,
        })
        .from(artwork)
        .where(eq(artwork.id, artworkId as string))
        .limit(1);

      if (artworkData.length === 0 || !artworkData[0].imageData) {
        return new Response("Image not found", { status: 404 });
      }

      const { imageData, imageMimeType } = artworkData[0];

      // Convert base64 data to buffer
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Return the image with proper headers
      return new Response(imageBuffer, {
        headers: {
          "Content-Type": imageMimeType || "image/jpeg",
          "Cache-Control": "public, max-age=31536000", // Cache for 1 year
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Error serving image:", error);
      return new Response("Internal server error", { status: 500 });
    }
  },
});
