"use client";

import { useEffect } from "react";
import type { ActionResult } from "@/lib/action-result";

export default function FormMessage({ state }: { state: ActionResult | null }) {
  useEffect(() => {
    if (state?.success) {
      const form = document.querySelector("form[data-reset-on-success]");
      if (form instanceof HTMLFormElement) {
        form.reset();
      }
    }
  }, [state]);

  if (!state || state.success) return null;

  return (
    <p className="text-sm text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2">
      {state.error}
    </p>
  );
}
