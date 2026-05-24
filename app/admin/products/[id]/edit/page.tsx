import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/actions/products";
import { getCategories, getManufacturers } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product = null;
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let manufacturers: Awaited<ReturnType<typeof getManufacturers>> = [];

  try {
    [product, categories, manufacturers] = await Promise.all([
      prisma.product.findUnique({ where: { id } }),
      getCategories(),
      getManufacturers(),
    ]);
  } catch {
    // DB not ready
  }

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-sm text-muted hover:text-primary transition-colors"
      >
        ← Товары
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mt-2 mb-6">Редактировать товар</h1>
      <ProductForm
        product={product}
        categories={categories}
        manufacturers={manufacturers}
        action={boundUpdate}
        submitLabel="Сохранить"
      />
    </div>
  );
}
