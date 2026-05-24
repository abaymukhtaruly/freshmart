"use client";

import { useTransition } from "react";
import { deleteCategory } from "@/actions/categories";

export default function DeleteCategoryButton({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Удалить «${label}»?`)) return;
    startTransition(() => void deleteCategory(id));
  };

  return (
    <button
      type="button"
      disabled={pending}
      onClick={handleDelete}
      className="text-xs font-medium text-accent hover:underline disabled:opacity-50"
    >
      {pending ? "..." : "Удалить"}
    </button>
  );
}
