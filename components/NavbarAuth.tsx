import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

export default async function NavbarAuth() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <Link
        href="/account"
        className="flex flex-col items-center text-text-primary hover:text-primary transition-colors group"
      >
        <span
          className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          person
        </span>
        <span className="text-[11px] font-medium mt-0.5 max-w-[72px] truncate">
          {user.name ?? "Аккаунт"}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="flex flex-col items-center text-text-primary hover:text-primary transition-colors group"
    >
      <span
        className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform"
        style={{ fontVariationSettings: "'FILL' 0" }}
      >
        person
      </span>
      <span className="text-[11px] font-medium mt-0.5">Войти</span>
    </Link>
  );
}
