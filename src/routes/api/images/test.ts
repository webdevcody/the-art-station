import { Route } from "@tanstack/react-start";

export const RouteComponent = Route.createComponent({
  component: async () => {
    // Simple test endpoint to verify the image API is working
    return new Response("Image API is working!", {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  },
});
