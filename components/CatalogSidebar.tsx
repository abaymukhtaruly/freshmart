import Link from "next/link";
import type { Category, Manufacturer } from "@prisma/client";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type CatalogSidebarProps = {
  categories: (Category & { children: Category[] })[];
  manufacturers: Manufacturer[];
  activeCategoryId?: string;
  activeManufacturerId?: string;
  locale?: Locale;
};

function buildCatalogHref(params: { category?: string; manufacturer?: string }) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.manufacturer) search.set("manufacturer", params.manufacturer);
  const qs = search.toString();
  return qs ? `/catalog?${qs}` : "/catalog";
}

export default function CatalogSidebar({
  categories,
  manufacturers,
  activeCategoryId,
  activeManufacturerId,
  locale = "ru",
}: CatalogSidebarProps) {
  const rootCategories = categories.filter((c) => !c.parentId);

  return (
    <aside className="w-[240px] flex-shrink-0 space-y-8">
      <div>
        <h3 className="font-bold text-lg mb-4 text-text-primary">{t(locale, "catalog.catalog")}</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href={buildCatalogHref({ manufacturer: activeManufacturerId })}
              className={`text-sm font-medium transition-colors ${
                !activeCategoryId ? "text-primary" : "text-text-primary hover:text-primary"
              }`}
            >
              {t(locale, "catalog.all_products")}
            </Link>
          </li>
          {rootCategories.map((category) => {
            const children = categories.filter((c) => c.parentId === category.id);
            const isActive = activeCategoryId === category.id;
            const childActive = children.some((c) => c.id === activeCategoryId);

            return (
              <li key={category.id}>
                <Link
                  href={buildCatalogHref({
                    category: category.id,
                    manufacturer: activeManufacturerId,
                  })}
                  className={`text-sm font-bold transition-colors block ${
                    isActive || childActive
                      ? "text-primary"
                      : "text-text-primary hover:text-primary"
                  }`}
                >
                  {category.name}
                </Link>
                {children.length > 0 && (
                  <ul className="pl-4 space-y-1 border-l-2 border-primary/20 ml-2 mt-2">
                    {children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={buildCatalogHref({
                            category: child.id,
                            manufacturer: activeManufacturerId,
                          })}
                          className={`text-sm transition-colors ${
                            activeCategoryId === child.id
                              ? "text-primary font-medium"
                              : "text-text-muted hover:text-primary"
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {manufacturers.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-4 text-text-primary">{t(locale, "catalog.manufacturer")}</h3>
          <ul className="space-y-2">
            {manufacturers.map((manufacturer) => (
              <li key={manufacturer.id}>
                <Link
                  href={buildCatalogHref({
                    category: activeCategoryId,
                    manufacturer:
                      activeManufacturerId === manufacturer.id
                        ? undefined
                        : manufacturer.id,
                  })}
                  className={`text-sm font-medium transition-colors block px-2 py-1 rounded ${
                    activeManufacturerId === manufacturer.id
                      ? "bg-primary/10 text-primary"
                      : "text-text-primary hover:text-primary"
                  }`}
                >
                  {manufacturer.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
