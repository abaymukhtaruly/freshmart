"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Обзор", icon: "dashboard" },
  { href: "/admin/products", label: "Товары", icon: "inventory_2" },
  { href: "/admin/categories", label: "Категории", icon: "category" },
  { href: "/admin/manufacturers", label: "Производители", icon: "factory" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-56 flex-shrink-0 border-r border-border bg-white min-h-[calc(100vh-60px)] p-4">
      <div className="mb-6">
        <Link href="/" className="text-sm text-muted hover:text-primary transition-colors">
          ← На сайт
        </Link>
        <h2 className="text-lg font-bold text-text-primary mt-2">Админ-панель</h2>
      </div>
      <ul className="space-y-1">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-primary hover:bg-background"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {link.icon}
                </span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
