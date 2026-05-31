import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import AuthForm, { AuthFormFooter } from "@/components/auth/AuthForm";
import { register } from "@/actions/auth";
import { getCurrentUser } from "@/lib/session";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/i18n";

export default async function RegisterPage() {
  const user = await getCurrentUser();
  const locale = await getLocale();
  if (user) redirect("/account");

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-md mx-auto w-full px-8 py-12">
        <Link href="/" className="text-sm text-muted hover:text-primary transition-colors">
          ← На главную
        </Link>
        <h1 className="text-2xl font-bold text-text-primary mt-4 mb-2">{t(locale, "auth.register_title")}</h1>
        <p className="text-sm text-muted mb-8">{locale === "kz" ? "FreshMart-та тапсырыс беру үшін аккаунт құрыңыз" : "Создайте аккаунт для заказов в FreshMart"}</p>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <AuthForm action={register} submitLabel={t(locale, "auth.register_button")} fields="register" locale={locale} />
          <AuthFormFooter mode="register" locale={locale} />
        </div>
      </main>
    </>
  );
}
