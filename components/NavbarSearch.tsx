"use client";

import { useSearchParams } from "next/navigation";

export default function NavbarSearch() {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("search") || "";

  return (
    <form action="/catalog" method="GET" className="flex-1 max-w-2xl relative">
      <span
        className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        style={{ fontVariationSettings: "'FILL' 0" }}
      >
        search
      </span>
      <input
        name="search"
        defaultValue={defaultValue}
        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-muted text-text-primary"
        placeholder="Поиск товаров (например, куриное филе)"
        type="search"
      />
    </form>
  );
}
