import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/actions/products";
import { getCategories, getManufacturers } from "@/lib/queries";

export default async function NewProductPage() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let manufacturers: Awaited<ReturnType<typeof getManufacturers>> = [];

  try {
    [categories, manufacturers] = await Promise.all([
      getCategories(),
      getManufacturers(),
    ]);
  } catch {
    // DB not ready
  }

  if (categories.length === 0 || manufacturers.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-4">Новый товар</h1>
        <p className="text-sm text-muted mb-4">
          Сначала создайте хотя бы одну категорию и одного производителя.
        </p>
        <div className="flex gap-3">
          <Link href="/admin/categories" className="text-primary font-medium hover:underline">
            Категории
          </Link>
          <Link href="/admin/manufacturers" className="text-primary font-medium hover:underline">
            Производители
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-sm text-muted hover:text-primary transition-colors"
      >
        ← Товары
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mt-2 mb-6">Новый товар</h1>
      <ProductForm
        categories={categories}
        manufacturers={manufacturers}
        action={createProduct}
        submitLabel="Создать товар"
      />
    </div>
  );
}
