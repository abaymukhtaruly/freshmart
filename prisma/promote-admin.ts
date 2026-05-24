/**
 * Promote a user to ADMIN by email.
 * Usage: npx tsx prisma/promote-admin.ts you@example.com
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "@prisma/client";

const email = process.argv[2];
if (!email) {
  console.error("Usage: npx tsx prisma/promote-admin.ts <email>");
  process.exit(1);
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const parsed = new URL(connectionString);
if (!parsed.searchParams.get("sslmode")) parsed.searchParams.set("sslmode", "verify-full");
const adapter = new PrismaPg({ connectionString: parsed.toString() });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.update({
    where: { email },
    data: { role: Role.ADMIN },
  });
  console.log(`Promoted ${user.email} to ADMIN`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
