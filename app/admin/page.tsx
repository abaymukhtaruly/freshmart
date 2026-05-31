import Link from "next/link";
import { getDashboardStats } from "@/lib/queries";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/i18n";

export default async function AdminDashboardPage() {
  const locale = await getLocale();
  let stats = { products: 0, categories: 0, manufacturers: 0, activeProducts: 0 };

  try {
    stats = await getDashboardStats();
  } catch {
    // DB may not be connected yet
  }

  const cards = [
    { label: t(locale, "admin.products_count"), value: stats.products, href: "/admin/products", sub: `${stats.activeProducts} ${t(locale, "admin.active_products")}` },
    { label: t(locale, "admin.categories"), value: stats.categories, href: "/admin/categories" },
    { label: t(locale, "admin.manufacturers"), value: stats.manufacturers, href: "/admin/manufacturers" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">{t(locale, "admin.overview")}</h1>
      <p className="text-sm text-muted mb-8">
        {t(locale, "admin.dashboard_desc")}
      </p>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white border border-border rounded-xl p-6 hover:border-primary transition-colors shadow-sm"
          >
            <p className="text-sm text-muted mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-primary">{card.value}</p>
            {card.sub && <p className="text-xs text-muted mt-1">{card.sub}</p>}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors"
        >
          + Добавить товар
        </Link>
        <Link
          href="/admin/categories"
          className="bg-white border border-border text-text-primary px-4 py-2 rounded-lg text-sm font-bold hover:border-primary transition-colors"
        >
          Категории
        </Link>
        <Link
          href="/admin/manufacturers"
          className="bg-white border border-border text-text-primary px-4 py-2 rounded-lg text-sm font-bold hover:border-primary transition-colors"
        >
          Производители
        </Link>
      </div>
    </div>
  );
}
