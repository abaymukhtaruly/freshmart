import Navbar from "@/components/Navbar";
import CatalogSidebar from "@/components/CatalogSidebar";
import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";
import {
  AdminCatalogHeaderAction,
  AdminEmptyCatalogLinks,
} from "@/components/admin/AdminCatalogActions";
import { getActiveProducts, getManufacturers } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/i18n";

type SearchParams = Promise<{ category?: string; manufacturer?: string; sort?: string; search?: string }>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const locale = await getLocale();

  let products: Awaited<ReturnType<typeof getActiveProducts>> = [];
  let manufacturers: Awaited<ReturnType<typeof getManufacturers>> = [];
  let activeCategoryName = t(locale, "catalog.catalog");
  let sidebarCategories: Parameters<typeof CatalogSidebar>[0]["categories"] = [];

  try {
    const allCategories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    sidebarCategories = allCategories.map((c) => ({
      ...c,
      children: allCategories.filter((child) => child.parentId === c.id),
    }));
    manufacturers = await getManufacturers();
    products = await getActiveProducts({
      categoryId: params.category,
      manufacturerId: params.manufacturer,
      sort: params.sort,
      search: params.search,
    });

    if (params.search) {
      activeCategoryName = `${t(locale, "catalog.search")} ${params.search}`;
    } else if (params.category) {
      const cat = allCategories.find((c) => c.id === params.category);
      if (cat) activeCategoryName = cat.name;
    }
  } catch {
    // DB not connected
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-8 py-6 flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Sidebar - hidden on mobile, shown on md+ */}
        <div className="hidden md:block">
          <CatalogSidebar
            categories={sidebarCategories}
            manufacturers={manufacturers}
            activeCategoryId={params.category}
            activeManufacturerId={params.manufacturer}
            locale={locale}
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-text-primary flex items-baseline">
                {activeCategoryName}
                <span className="text-sm font-medium text-muted ml-2">
                  {products.length} {t(locale, "catalog.products_count")}
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <SortSelect locale={locale} />
              <AdminCatalogHeaderAction />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-white border border-border rounded-xl p-8 md:p-12 text-center">
              <p className="text-muted mb-4">{t(locale, "catalog.empty")}</p>
              <AdminEmptyCatalogLinks />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  productId={product.id}
                  title={product.title}
                  manufacturer={product.manufacturer.name}
                  price={product.price}
                  imageUrl={
                    product.imageUrl ??
                    "https://images.unsplash.com/photo-1604503468506-440b703b1c92?w=400&h=300&fit=crop"
                  }
                  minOrder={product.minOrder}
                  packaging={product.packaging}
                  locale={locale}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
