// Run with: npm run seed:admin -- --email=you@example.com --password=... --role=owner
// Only run this locally, against your own DATABASE_URL. There is no public
// signup route by design — this script is the only way accounts get created.
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import "dotenv/config";

function parseArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found?.slice(prefix.length);
}

async function main() {
  const email = parseArg("email");
  const password = parseArg("password");
  const role = parseArg("role") ?? "developer";

  if (!email || !password) {
    console.error(
      "Usage: npm run seed:admin -- --email=you@example.com --password=yourpassword --role=owner"
    );
    process.exit(1);
  }
  if (!["owner", "developer"].includes(role)) {
    console.error('role must be "owner" or "developer"');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const passwordHash = await bcrypt.hash(password, 12);

  await pool.query(
    `insert into admin_users (email, password_hash, role)
     values ($1, $2, $3)
     on conflict (email) do update set password_hash = excluded.password_hash, role = excluded.role`,
    [email, passwordHash, role]
  );

  console.log(`Admin user ready: ${email} (${role})`);
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
