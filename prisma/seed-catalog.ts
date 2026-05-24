import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { catalogCategories } from "./data/catalog-categories";

function createPrisma() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const parsed = new URL(connectionString);
  const legacySsl = new Set(["prefer", "require", "verify-ca"]);
  const sslmode = parsed.searchParams.get("sslmode");
  if (!sslmode) {
    parsed.searchParams.set("sslmode", "verify-full");
  } else if (legacySsl.has(sslmode) && !parsed.searchParams.has("uselibpqcompat")) {
    parsed.searchParams.set("sslmode", "verify-full");
  }
  const adapter = new PrismaPg({ connectionString: parsed.toString() });
  return new PrismaClient({ adapter });
}

async function main() {
  const prisma = createPrisma();
  let roots = 0;
  let children = 0;

  for (const root of catalogCategories) {
    const parent = await prisma.category.upsert({
      where: { name: root.name },
      create: { name: root.name },
      update: {},
    });
    roots += 1;

    for (const childName of root.children) {
      await prisma.category.upsert({
        where: { name: childName },
        create: { name: childName, parentId: parent.id },
        update: { parentId: parent.id },
      });
      children += 1;
    }
  }

  console.log(`Catalog seeded: ${roots} root categories, ${children} subcategories.`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
