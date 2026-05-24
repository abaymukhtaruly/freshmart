"use client";

import { useTransition } from "react";
import { deleteManufacturer } from "@/actions/manufacturers";

export default function DeleteManufacturerButton({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Удалить «${label}»?`)) return;
    startTransition(() => void deleteManufacturer(id));
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
