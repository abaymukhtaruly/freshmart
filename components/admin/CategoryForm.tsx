"use client";

import { useActionState } from "react";
import FormMessage from "@/components/admin/FormMessage";
import type { ActionResult } from "@/lib/action-result";
import type { Category } from "@prisma/client";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type CategoryFormProps = {
  categories: Category[];
  action: (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  category?: Category;
  submitLabel: string;
  locale?: Locale;
};

export default function CategoryForm({
  categories,
  action,
  category,
  submitLabel,
  locale = "ru",
}: CategoryFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const parentOptions = categories.filter((c) => c.id !== category?.id);

  return (
    <form
      action={formAction}
      data-reset-on-success
      className="flex flex-wrap items-end gap-3 p-4 bg-background rounded-lg border border-border"
    >
      <FormMessage state={state} />
      <div className="flex-1 min-w-[160px]">
        <label className="block text-xs font-medium text-muted mb-1">{t(locale, "form.name")} *</label>
        <input
          name="name"
          required
          defaultValue={category?.name}
          placeholder={locale === "kz" ? "Құс өнімі" : "Куриная продукция"}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      </div>
      <div className="min-w-[160px]">
        <label className="block text-xs font-medium text-muted mb-1">{locale === "kz" ? "Ата-аналығы" : "Родитель"}</label>
        <select
          name="parentId"
          defaultValue={category?.parentId ?? ""}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
        >
          <option value="">{locale === "kz" ? "Ешбір (түбі)" : "Нет (корневая)"}</option>
          {parentOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {pending ? "..." : submitLabel}
      </button>
    </form>
  );
}
