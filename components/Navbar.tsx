import Link from "next/link";
import { Suspense } from "react";
import NavbarAuth from "@/components/NavbarAuth";
import NavbarCart from "@/components/NavbarCart";
import NavbarAdminLink from "@/components/NavbarAdminLink";
import NavbarSearch from "@/components/NavbarSearch";

export default function Navbar() {
  return (
    <header className="flex flex-col">
      {/* Utility Bar */}
      <div className="h-8 bg-primary border-b border-primary-dark flex items-center justify-between px-8 text-[13px] font-medium text-white">
        <div className="flex items-center gap-2">
          <span>🚚 Бесплатная доставка по городу при заказе от 10 кг!</span>
        </div>
        <div className="flex items-center bg-primary-dark rounded-full p-0.5 border border-primary-dark">
          <button className="px-3 py-0.5 rounded-full bg-white text-primary shadow-sm transition-colors">
            RU
          </button>
          <button className="px-3 py-0.5 rounded-full text-white/80 hover:text-white transition-colors">
            KZ
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="h-[60px] bg-white border-b border-border sticky top-0 z-50 flex items-center px-8 gap-8">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <span className="font-bold text-xl tracking-tight">FreshMart</span>
        </Link>
        <Suspense fallback={
          <div className="flex-1 max-w-2xl h-9 bg-background border border-border rounded-lg animate-pulse" />
        }>
          <NavbarSearch />
        </Suspense>
        <Link
          href="/catalog"
          className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
        >
          Каталог
        </Link>
        <NavbarAdminLink />
        <div className="flex items-center gap-6 ml-auto">
          <NavbarAuth />
          <NavbarCart />
        </div>
      </nav>
    </header>
  );
}