export const env = {
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  BASE_URL: process.env.BASE_URL ?? "http://localhost:5173",
};
