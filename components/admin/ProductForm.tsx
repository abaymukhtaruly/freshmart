"use client";

import { useActionState } from "react";
import Link from "next/link";
import FormMessage from "@/components/admin/FormMessage";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { ActionResult } from "@/lib/action-result";
import type { Category, Manufacturer, Product } from "@prisma/client";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type ProductFormProps = {
  categories: Category[];
  manufacturers: Manufacturer[];
  action: (
    prev: ActionResult | null,
    formData: FormData
  ) => Promise<ActionResult>;
  product?: Product;
  submitLabel: string;
  locale?: Locale;
};

export default function ProductForm({
  categories,
  manufacturers,
  action,
  product,
  submitLabel,
  locale = "ru",
}: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <FormMessage state={state} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t(locale, "form.title")} *
          </label>
          <input
            name="title"
            required
            defaultValue={product?.title}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t(locale, "form.description")}
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={product?.description ?? ""}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            SKU
          </label>
          <input
            name="sku"
            defaultValue={product?.sku ?? ""}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <ImageUploadField defaultValue={product?.imageUrl} locale={locale} />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t(locale, "form.price")} *
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {locale === "kz" ? "Осы" : "Остаток"} *
          </label>
          <input
            name="stockQuantity"
            type="number"
            min="0"
            required
            defaultValue={product?.stockQuantity ?? 0}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t(locale, "form.min_order")} *
          </label>
          <input
            name="minOrder"
            required
            defaultValue={product?.minOrder ?? "1 кг"}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t(locale, "form.packaging")} *
          </label>
          <input
            name="packaging"
            required
            defaultValue={product?.packaging}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {locale === "kz" ? "Температура" : "Температура"}
          </label>
          <input
            name="temperature"
            defaultValue={product?.temperature ?? "-18°C"}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t(locale, "form.category")} *
          </label>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
          >
            <option value="">{locale === "kz" ? "Таңдаңыз..." : "Выберите..."}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t(locale, "form.manufacturer")} *
          </label>
          <select
            name="manufacturerId"
            required
            defaultValue={product?.manufacturerId}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
          >
            <option value="">{locale === "kz" ? "Таңдаңыз..." : "Выберите..."}</option>
            {manufacturers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="isHalal"
              type="checkbox"
              defaultChecked={product?.isHalal ?? true}
              className="rounded border-border text-primary accent-primary h-4 w-4"
            />
            <span className="text-sm font-medium text-text-primary">{t(locale, "product.halal")}</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {pending ? t(locale, "form.loading") : submitLabel}
        </button>
        <Link
          href="/admin/products"
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          {t(locale, "form.cancel")}
        </Link>
      </div>
    </form>
  );
}
