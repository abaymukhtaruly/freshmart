import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/actions/products";
import { getCategories, getManufacturers } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/i18n";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();

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
        ← {t(locale, "admin.products")}
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mt-2 mb-6">{t(locale, "admin.edit_product")}</h1>
      <ProductForm
        product={product}
        categories={categories}
        manufacturers={manufacturers}
        action={boundUpdate}
        submitLabel={t(locale, "form.submit")}
        locale={locale}
      />
    </div>
  );
}
