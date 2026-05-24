import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/session";
import { logout } from "@/actions/auth";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto w-full px-8 py-12">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Мой аккаунт</h1>
        <p className="text-sm text-muted mb-8">Добро пожаловать, {user.name ?? "покупатель"}!</p>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <p className="text-xs text-muted">Email</p>
            <p className="font-medium text-text-primary">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <p className="text-xs text-muted">Телефон</p>
              <p className="font-medium text-text-primary">{user.phone}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-muted">Роль</p>
            <p className="font-medium text-text-primary">
              {user.role === "ADMIN" ? "Администратор" : "Покупатель"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <Link
              href="/cart"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors"
            >
              Моя корзина
            </Link>
            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="bg-white border border-border text-text-primary px-4 py-2 rounded-lg text-sm font-bold hover:border-primary transition-colors"
              >
                Админ-панель
              </Link>
            )}
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-accent font-medium hover:underline px-2 py-2"
              >
                Выйти
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
