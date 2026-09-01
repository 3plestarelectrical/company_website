// Run with: npm run db:migrate
// Applies schema.sql against DATABASE_URL. Safe to re-run — every statement
// uses "if not exists".
import { readFileSync } from "fs";
import { join } from "path";
import { Pool } from "pg";
import "dotenv/config";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const sql = readFileSync(join(__dirname, "schema.sql"), "utf-8");

  console.log("Applying schema.sql...");
  await pool.query(sql);
  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
