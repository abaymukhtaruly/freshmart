import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/session";
import { logout } from "@/actions/auth";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/i18n";

export default async function AccountPage() {
  const user = await getCurrentUser();
  const locale = await getLocale();
  if (!user) redirect("/login");

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto w-full px-8 py-12">
        <h1 className="text-2xl font-bold text-text-primary mb-2">{t(locale, "account.title")}</h1>
        <p className="text-sm text-muted mb-8">{t(locale, "account.welcome")}, {user.name ?? (locale === "kz" ? "сатып алушы" : "покупатель")}!</p>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <p className="text-xs text-muted">{t(locale, "auth.email_label")}</p>
            <p className="font-medium text-text-primary">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <p className="text-xs text-muted">{locale === "kz" ? "Телефон" : "Телефон"}</p>
              <p className="font-medium text-text-primary">{user.phone}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-muted">{t(locale, "account.role_label")}</p>
            <p className="font-medium text-text-primary">
              {user.role === "ADMIN" ? (locale === "kz" ? "Әкімші" : "Администратор") : (locale === "kz" ? "Сатып алушы" : "Покупатель")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <Link
              href="/cart"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors"
            >
              {t(locale, "nav.cart")}
            </Link>
            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="bg-white border border-border text-text-primary px-4 py-2 rounded-lg text-sm font-bold hover:border-primary transition-colors"
              >
                {t(locale, "admin.title")}
              </Link>
            )}
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-accent font-medium hover:underline px-2 py-2"
              >
                {t(locale, "account.logout")}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
