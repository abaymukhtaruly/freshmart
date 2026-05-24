import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseCatalogMarkdown } from "./data/parse-catalog";

const __dirname = dirname(fileURLToPath(import.meta.url));

function createPrisma() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const parsed = new URL(connectionString);
  const legacySsl = new Set(["prefer", "require", "verify-ca"]);
  const sslmode = parsed.searchParams.get("sslmode");
  if (!sslmode) parsed.searchParams.set("sslmode", "verify-full");
  else if (legacySsl.has(sslmode) && !parsed.searchParams.has("uselibpqcompat")) {
    parsed.searchParams.set("sslmode", "verify-full");
  }
  const adapter = new PrismaPg({ connectionString: parsed.toString() });
  return new PrismaClient({ adapter });
}

async function main() {
  const prisma = createPrisma();
  const catalogPath = join(__dirname, "data/online_shop_catalog.md");
  const products = parseCatalogMarkdown(catalogPath);

  if (products.length === 0) {
    throw new Error("No products parsed from catalog markdown");
  }

  const categoryRows = await prisma.category.findMany({
    select: { id: true, name: true },
  });
  const categoryByName = new Map(categoryRows.map((c) => [c.name, c.id]));

  const missingCategories = [
    ...new Set(products.map((p) => p.categoryName).filter((n) => !categoryByName.has(n))),
  ];
  if (missingCategories.length > 0) {
    throw new Error(
      `Missing categories in DB (run npm run db:seed:catalog first): ${missingCategories.join(", ")}`
    );
  }

  const manufacturerNames = [...new Set(products.map((p) => p.manufacturerName))];
  const manufacturerByName = new Map<string, string>();

  for (const name of manufacturerNames) {
    const row = await prisma.manufacturer.upsert({
      where: { name },
      create: { name },
      update: {},
    });
    manufacturerByName.set(name, row.id);
  }

  let created = 0;
  let updated = 0;

  for (const product of products) {
    const categoryId = categoryByName.get(product.categoryName)!;
    const manufacturerId = manufacturerByName.get(product.manufacturerName)!;

    const existing = await prisma.product.findUnique({ where: { sku: product.sku } });
    const data = {
      title: product.title,
      description: product.description ?? null,
      price: product.price,
      imageUrl: product.imageUrl,
      minOrder: product.minOrder,
      packaging: product.packaging,
      categoryId,
      manufacturerId,
      isHalal: !product.title.toLowerCase().includes("говяж"),
      isActive: true,
      stockQuantity: 100,
      temperature: "-18°C",
    };

    if (existing) {
      await prisma.product.update({ where: { sku: product.sku }, data });
      updated += 1;
    } else {
      await prisma.product.create({ data: { ...data, sku: product.sku } });
      created += 1;
    }
  }

  console.log(
    `Products seeded: ${products.length} total (${created} created, ${updated} updated), ${manufacturerNames.length} manufacturers.`
  );
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
