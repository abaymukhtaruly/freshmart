"use client";

import { useTransition } from "react";
import type { ActionResult } from "@/lib/action-result";

export default function DeleteRowButton({
  label,
  onDelete,
}: {
  label: string;
  onDelete: () => Promise<ActionResult>;
}) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Удалить «${label}»?`)) return;
    startTransition(async () => {
      await onDelete();
    });
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
