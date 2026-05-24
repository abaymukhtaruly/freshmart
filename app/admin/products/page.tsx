import Link from "next/link";
import { Suspense } from "react";
import ProductFilters from "@/components/admin/ProductFilters";
import ProductRowActions from "@/components/admin/ProductRowActions";
import { getAdminProducts, getCategories } from "@/lib/queries";

type SearchParams = Promise<{ q?: string; category?: string; status?: string }>;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const status =
    params.status === "active" || params.status === "inactive"
      ? params.status
      : "all";

  let products: Awaited<ReturnType<typeof getAdminProducts>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];

  try {
    [products, categories] = await Promise.all([
      getAdminProducts({
        search: params.q,
        categoryId: params.category,
        status,
      }),
      getCategories(),
    ]);
  } catch {
    // DB not ready
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Товары</h1>
        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors"
        >
          + Добавить
        </Link>
      </div>

      <Suspense fallback={<div className="h-16 mb-6" />}>
        <ProductFilters categories={categories} />
      </Suspense>

      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-text-primary">Товар</th>
              <th className="text-left px-4 py-3 font-semibold text-text-primary">Категория</th>
              <th className="text-left px-4 py-3 font-semibold text-text-primary">Цена</th>
              <th className="text-left px-4 py-3 font-semibold text-text-primary">Статус</th>
              <th className="text-right px-4 py-3 font-semibold text-text-primary">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted">
                  Товаров нет.{" "}
                  <Link href="/admin/products/new" className="text-primary hover:underline">
                    Добавить первый
                  </Link>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="w-10 h-10 rounded object-cover bg-background"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-background flex items-center justify-center text-muted">
                          <span className="material-symbols-outlined text-[18px]">image</span>
                        </div>
                      )}
                      <span className="font-medium text-text-primary line-clamp-1">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{product.category.name}</td>
                  <td className="px-4 py-3 font-medium text-primary">
                    {product.price.toLocaleString("ru-RU")} ₸
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        product.isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-muted/20 text-muted"
                      }`}
                    >
                      {product.isActive ? "Активен" : "Скрыт"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <ProductRowActions id={product.id} isActive={product.isActive} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
