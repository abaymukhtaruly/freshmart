import Link from "next/link";
import { isAdminUser } from "@/lib/auth";

export default async function NavbarAdminLink() {
  const admin = await isAdminUser();
  if (!admin) return null;

  return (
    <Link
      href="/admin"
      className="text-sm font-medium text-muted hover:text-primary transition-colors"
    >
      Админ
    </Link>
  );
}
