import { createServerFn } from "@tanstack/react-start";

export const testEnv = createServerFn({ method: "GET" }).handler(async () => {
  return {
    stripeKey: process.env.STRIPE_SECRET_KEY ? "Set" : "Not set",
    baseUrl: process.env.BASE_URL || "Not set",
    nodeEnv: process.env.NODE_ENV,
  };
});
