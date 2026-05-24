"use client";

import { useTransition } from "react";
import Link from "next/link";
import { activateProduct, deactivateProduct } from "@/actions/products";

export default function ProductRowActions({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const [pending, startTransition] = useTransition();

  const toggleActive = () => {
    startTransition(() => {
      void (async () => {
        if (isActive) await deactivateProduct(id);
        else await activateProduct(id);
      })();
    });
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      <Link
        href={`/admin/products/${id}/edit`}
        className="text-xs font-medium text-primary hover:underline"
      >
        Изменить
      </Link>
      <button
        type="button"
        disabled={pending}
        onClick={toggleActive}
        className={`text-xs font-medium hover:underline disabled:opacity-50 ${
          isActive ? "text-accent" : "text-primary"
        }`}
      >
        {pending ? "..." : isActive ? "Скрыть" : "Показать"}
      </button>
    </div>
  );
}
