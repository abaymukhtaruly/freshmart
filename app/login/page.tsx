import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import AuthForm, { AuthFormFooter } from "@/components/auth/AuthForm";
import { login } from "@/actions/auth";
import { getCurrentUser } from "@/lib/session";
import { Role } from "@prisma/client";

type SearchParams = Promise<{ callbackUrl?: string; error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();

  if (user) {
    if (user.role === Role.ADMIN && params.callbackUrl?.startsWith("/admin")) {
      redirect(params.callbackUrl);
    }
    redirect(user.role === Role.ADMIN ? "/admin" : "/account");
  }

  const callbackUrl =
    params.callbackUrl?.startsWith("/") && !params.callbackUrl.startsWith("//")
      ? params.callbackUrl
      : "";

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-md mx-auto w-full px-8 py-12">
        <Link href="/" className="text-sm text-muted hover:text-primary transition-colors">
          ← На главную
        </Link>
        <h1 className="text-2xl font-bold text-text-primary mt-4 mb-2">Вход</h1>
        <p className="text-sm text-muted mb-4">Войдите, чтобы сохранить корзину и оформить заказ</p>

        {params.error === "forbidden" && (
          <p className="text-sm text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 mb-4">
            Для доступа к админ-панели нужен аккаунт администратора.
          </p>
        )}

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <AuthForm
            action={login}
            submitLabel="Войти"
            fields="login"
            callbackUrl={callbackUrl}
          />
          <AuthFormFooter mode="login" />
        </div>
      </main>
    </>
  );
}
