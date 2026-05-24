import Link from "next/link";
import { isAdminUser } from "@/lib/auth";

export async function AdminCatalogHeaderAction() {
  const admin = await isAdminUser();
  if (!admin) return null;

  return (
    <Link
      href="/admin/products/new"
      className="text-sm text-primary font-medium hover:underline"
    >
      + Добавить товар
    </Link>
  );
}

export async function AdminEmptyCatalogLinks() {
  const admin = await isAdminUser();
  if (!admin) return null;

  return (
    <div className="flex justify-center gap-4 text-sm">
      <Link href="/admin/categories" className="text-primary font-medium hover:underline">
        Создать категории
      </Link>
      <Link href="/admin/manufacturers" className="text-primary font-medium hover:underline">
        Создать производителей
      </Link>
      <Link href="/admin/products/new" className="text-primary font-medium hover:underline">
        Добавить товар
      </Link>
    </div>
  );
}

export async function AdminHomeLink() {
  const admin = await isAdminUser();
  if (!admin) return null;

  return (
    <Link
      href="/admin"
      className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors"
    >
      Открыть админ-панель
    </Link>
  );
}
