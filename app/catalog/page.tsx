import Link from "next/link";
import Navbar from "@/components/Navbar";
import CatalogSidebar from "@/components/CatalogSidebar";
import ProductCard from "@/components/ProductCard";
import { getActiveProducts, getManufacturers } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ category?: string; manufacturer?: string }>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  let products: Awaited<ReturnType<typeof getActiveProducts>> = [];
  let manufacturers: Awaited<ReturnType<typeof getManufacturers>> = [];
  let activeCategoryName = "Каталог";
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
    });

    if (params.category) {
      const cat = allCategories.find((c) => c.id === params.category);
      if (cat) activeCategoryName = cat.name;
    }
  } catch {
    // DB not connected
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-8 py-6 flex gap-8">
        <CatalogSidebar
          categories={sidebarCategories}
          manufacturers={manufacturers}
          activeCategoryId={params.category}
          activeManufacturerId={params.manufacturer}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              {activeCategoryName}{" "}
              <span className="text-sm font-medium text-muted ml-2">
                {products.length} товаров
              </span>
            </h2>
            <Link
              href="/admin/products/new"
              className="text-sm text-primary font-medium hover:underline"
            >
              + Добавить товар
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="bg-white border border-border rounded-xl p-12 text-center">
              <p className="text-muted mb-4">В каталоге пока нет товаров</p>
              <div className="flex justify-center gap-4 text-sm">
                <Link href="/admin/categories" className="text-primary font-medium hover:underline">
                  Создать категории
                </Link>
                <Link
                  href="/admin/manufacturers"
                  className="text-primary font-medium hover:underline"
                >
                  Создать производителей
                </Link>
                <Link href="/admin/products/new" className="text-primary font-medium hover:underline">
                  Добавить товар
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
