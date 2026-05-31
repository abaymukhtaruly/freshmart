"use client";

import { useActionState } from "react";
import Link from "next/link";
import FormMessage from "@/components/admin/FormMessage";
import type { ActionResult } from "@/lib/action-result";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type AuthFormProps = {
  action: (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  submitLabel: string;
  fields: "login" | "register";
  callbackUrl?: string;
  locale?: Locale;
};

export default function AuthForm({
  action,
  submitLabel,
  fields,
  callbackUrl,
  locale = "ru",
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-4">
      {callbackUrl ? <input type="hidden" name="callbackUrl" value={callbackUrl} /> : null}
      <FormMessage state={state} />

      {fields === "register" && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">{t(locale, "form.name")}</label>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">{t(locale, "auth.email_label")}</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">{t(locale, "auth.password_label")}</label>
        <input
          name="password"
          type="password"
          required
          minLength={fields === "register" ? 6 : 1}
          autoComplete={fields === "register" ? "new-password" : "current-password"}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {fields === "register" && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">{t(locale, "auth.confirm_password_label")}</label>
          <input
            name="confirmPassword"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {pending ? t(locale, "form.loading") : submitLabel}
      </button>
    </form>
  );
}

export function AuthFormFooter({ mode, locale = "ru" }: { mode: "login" | "register"; locale?: Locale }) {
  if (mode === "login") {
    return (
      <p className="text-sm text-muted text-center mt-6">
        {t(locale, "auth.no_account")}{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          {t(locale, "auth.register_link")}
        </Link>
      </p>
    );
  }
  return (
    <p className="text-sm text-muted text-center mt-6">
      {t(locale, "auth.have_account")}{" "}
      <Link href="/login" className="text-primary font-medium hover:underline">
        {t(locale, "auth.login_link")}
      </Link>
    </p>
  );
}
