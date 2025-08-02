import "dotenv/config";

import { pool } from "./index";

async function main() {
  console.log("🌱 Starting database seeding...");

  await pool.end();
}

main().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
