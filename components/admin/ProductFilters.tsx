"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { Category } from "@prisma/client";

export default function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      startTransition(() => {
        router.push(`/admin/products?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap items-end gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-medium text-muted mb-1">Поиск</label>
        <input
          type="search"
          placeholder="Название товара..."
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(e) => updateParams({ q: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      </div>
      <div className="min-w-[180px]">
        <label className="block text-xs font-medium text-muted mb-1">Категория</label>
        <select
          defaultValue={searchParams.get("category") ?? ""}
          onChange={(e) => updateParams({ category: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
        >
          <option value="">Все категории</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-[140px]">
        <label className="block text-xs font-medium text-muted mb-1">Статус</label>
        <select
          defaultValue={searchParams.get("status") ?? "all"}
          onChange={(e) => updateParams({ status: e.target.value === "all" ? "" : e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
        >
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="inactive">Неактивные</option>
        </select>
      </div>
      {isPending && <span className="text-xs text-muted pb-2">Загрузка...</span>}
    </div>
  );
}
