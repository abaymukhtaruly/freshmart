"use client";

import { useActionState } from "react";
import Link from "next/link";
import FormMessage from "@/components/admin/FormMessage";
import type { ActionResult } from "@/lib/action-result";

type AuthFormProps = {
  action: (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  submitLabel: string;
  fields: "login" | "register";
};

export default function AuthForm({ action, submitLabel, fields }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-4">
      <FormMessage state={state} />

      {fields === "register" && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Имя</label>
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
        <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Пароль</label>
        <input
          name="password"
          type="password"
          required
          minLength={fields === "register" ? 6 : 1}
          autoComplete={fields === "register" ? "new-password" : "current-password"}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {pending ? "Подождите..." : submitLabel}
      </button>
    </form>
  );
}

export function AuthFormFooter({ mode }: { mode: "login" | "register" }) {
  if (mode === "login") {
    return (
      <p className="text-sm text-muted text-center mt-6">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    );
  }
  return (
    <p className="text-sm text-muted text-center mt-6">
      Уже есть аккаунт?{" "}
      <Link href="/login" className="text-primary font-medium hover:underline">
        Войти
      </Link>
    </p>
  );
}
