import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/actions/products";
import { getCategories, getManufacturers } from "@/lib/queries";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/i18n";

export default async function NewProductPage() {
  const locale = await getLocale();
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
        <h1 className="text-2xl font-bold text-text-primary mb-4">{t(locale, "admin.new_product")}</h1>
        <p className="text-sm text-muted mb-4">
          {locale === "kz" ? "Снаалы жасаңыз кемінде бір санат және бір өндіруші" : "Сначала создайте хотя бы одну категорию и одного производителя."}
        </p>
        <div className="flex gap-3">
          <Link href="/admin/categories" className="text-primary font-medium hover:underline">
            {t(locale, "admin.categories")}
          </Link>
          <Link href="/admin/manufacturers" className="text-primary font-medium hover:underline">
            {t(locale, "admin.manufacturers")}
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
        ← {t(locale, "admin.products")}
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mt-2 mb-6">{t(locale, "admin.new_product")}</h1>
      <ProductForm
        categories={categories}
        manufacturers={manufacturers}
        action={createProduct}
        submitLabel={t(locale, "admin.add_product")}
        locale={locale}
      />
    </div>
  );
}
