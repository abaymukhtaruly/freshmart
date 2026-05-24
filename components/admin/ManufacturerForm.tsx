"use client";

import { useActionState } from "react";
import FormMessage from "@/components/admin/FormMessage";
import type { ActionResult } from "@/lib/action-result";
import type { Manufacturer } from "@prisma/client";

type ManufacturerFormProps = {
  action: (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  manufacturer?: Manufacturer;
  submitLabel: string;
};

export default function ManufacturerForm({
  action,
  manufacturer,
  submitLabel,
}: ManufacturerFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form
      action={formAction}
      data-reset-on-success
      className="flex flex-wrap items-end gap-3 p-4 bg-background rounded-lg border border-border"
    >
      <div className="w-full">
        <FormMessage state={state} />
      </div>
      <div className="flex-1 min-w-[160px]">
        <label className="block text-xs font-medium text-muted mb-1">Название *</label>
        <input
          name="name"
          required
          defaultValue={manufacturer?.name}
          placeholder="УКПФ"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex-[2] min-w-[200px]">
        <label className="block text-xs font-medium text-muted mb-1">Описание</label>
        <input
          name="description"
          defaultValue={manufacturer?.description ?? ""}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
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
