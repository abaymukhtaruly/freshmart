"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export default function SortSelect({ locale = "ru" }: { locale?: Locale }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      className="text-sm font-medium border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-text-primary bg-white"
      value={searchParams.get("sort") || "newest"}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", e.target.value);
        router.push(`?${params.toString()}`);
      }}
    >
      <option value="newest">{t(locale, "sort.popular")}</option>
      <option value="price_asc">{t(locale, "sort.price_asc")}</option>
      <option value="price_desc">{t(locale, "sort.price_desc")}</option>
    </select>
  );
}
