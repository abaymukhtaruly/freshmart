"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
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
      <option value="newest">По популярности</option>
      <option value="price_asc">Сначала дешевые</option>
      <option value="price_desc">Сначала дорогие</option>
    </select>
  );
}
