import { readFileSync } from "fs";
import { join } from "path";
import { categoryImageUrls, defaultProductImage } from "./product-images";

export type ParsedProduct = {
  title: string;
  price: number;
  unit: "kg" | "piece";
  categoryName: string;
  manufacturerName: string;
  imageUrl: string;
  minOrder: string;
  packaging: string;
  description?: string;
  sku: string;
};

const MANUFACTURER_ALIASES: { pattern: RegExp; name: string }[] = [
  { pattern: /кызылжар\s*құс|кызылжар|қызылжар/i, name: "Кызылжар Құс" },
  { pattern: /алатау\s*кус|алатау/i, name: "Алатау Кус" },
  { pattern: /усть[\s-]*каменогорск|укпф|упкф/i, name: "УКПФ" },
  { pattern: /чикоделли/i, name: "Чикоделли" },
  { pattern: /алель/i, name: "Алель" },
  { pattern: /ардагер/i, name: "Ардагер" },
  { pattern: /айсер/i, name: "Айсер" },
  { pattern: /ан\s*нур/i, name: "Ан Нур" },
  { pattern: /ресурс/i, name: "Ресурс" },
  { pattern: /мираторг/i, name: "Мираторг" },
  { pattern: /iltov/i, name: "Iltov" },
  { pattern: /триумф/i, name: "Триумф" },
  { pattern: /amiko/i, name: "Amiko" },
  { pattern: /farm\s*frites/i, name: "Farm Frites" },
  { pattern: /гришина/i, name: "Гришина" },
  { pattern: /улыбино/i, name: "Улыбино" },
  { pattern: /утолайт/i, name: "Утолайт" },
  { pattern: /павлодар/i, name: "Павлодарская" },
  { pattern: /sadia/i, name: "Sadia" },
  { pattern: /эко\s*халяль/i, name: "Эко Халяль" },
  { pattern: /столичн/i, name: "Столичные" },
  { pattern: /норвег/i, name: "Норвегия" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яёқғүұіөһ]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function extractManufacturer(title: string, categoryName: string): string {
  for (const { pattern, name } of MANUFACTURER_ALIASES) {
    if (pattern.test(title)) return name;
  }
  if (categoryName.includes("Павлодарская")) return "Павлодарская";
  if (categoryName.includes("Семги")) return "Норвегия";
  if (/бедро куриное|куры бройлерные/i.test(title)) return "Общий ассортимент";
  return "Общий ассортимент";
}

function parseProductLine(
  line: string,
  categoryName: string
): ParsedProduct | null {
  const match = line.match(
    /^\*\s*(.+?)\s*[—–-]\s*\*\*(\d[\d\s]*)\s*тг\s*\/\s*(кг|шт)\*\*/i
  );
  if (!match) return null;

  let title = match[1].trim();
  const price = parseInt(match[2].replace(/\s/g, ""), 10);
  const unit = match[3].toLowerCase() === "шт" ? "piece" : "kg";

  let description: string | undefined;
  const noteMatch = title.match(/\s*\(([^)]+)\)\s*$/);
  if (noteMatch) {
    description = noteMatch[1];
    title = title.replace(/\s*\([^)]+\)\s*$/, "").trim();
  }

  const manufacturerName = extractManufacturer(title, categoryName);
  const minOrder = unit === "piece" ? "1 шт" : "1 кг";
  const packaging =
    unit === "piece"
      ? "1 шт"
      : title.toLowerCase().includes("подложке")
        ? "На подложке"
        : title.toLowerCase().includes("вакуум")
          ? "Вакуум"
          : title.toLowerCase().includes("монолит")
            ? "Монолит"
            : title.toLowerCase().includes("пакет")
              ? "Пакет"
              : "На развес";

  return {
    title,
    price,
    unit,
    categoryName,
    manufacturerName,
    imageUrl: categoryImageUrls[categoryName] ?? defaultProductImage,
    minOrder,
    packaging,
    description,
    sku: `fm-${slugify(title)}`,
  };
}

export function parseCatalogMarkdown(
  filePath = join(__dirname, "online_shop_catalog.md")
): ParsedProduct[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  let categoryName = "";
  const products: ParsedProduct[] = [];

  for (const line of lines) {
    const section = line.match(/^###\s+(.+)/);
    if (section) {
      categoryName = section[1].trim();
      continue;
    }
    if (!line.startsWith("*") || !categoryName) continue;
    const product = parseProductLine(line, categoryName);
    if (product) products.push(product);
  }

  return products;
}
