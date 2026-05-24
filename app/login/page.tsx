import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import AuthForm, { AuthFormFooter } from "@/components/auth/AuthForm";
import { login } from "@/actions/auth";
import { getCurrentUser } from "@/lib/session";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/account");

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-md mx-auto w-full px-8 py-12">
        <Link href="/" className="text-sm text-muted hover:text-primary transition-colors">
          ← На главную
        </Link>
        <h1 className="text-2xl font-bold text-text-primary mt-4 mb-2">Вход</h1>
        <p className="text-sm text-muted mb-8">Войдите, чтобы сохранить корзину и оформить заказ</p>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <AuthForm action={login} submitLabel="Войти" fields="login" />
          <AuthFormFooter mode="login" />
        </div>
      </main>
    </>
  );
}
