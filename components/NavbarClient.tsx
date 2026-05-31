"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useLocale } from "@/components/LocaleProvider";

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center bg-primary-dark rounded-full p-0.5 border border-primary-dark">
      <button
        onClick={() => setLocale("ru")}
        className={`px-3 py-0.5 rounded-full transition-colors text-sm font-medium ${
          locale === "ru"
            ? "bg-white text-primary shadow-sm"
            : "text-white/80 hover:text-white"
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLocale("kz")}
        className={`px-3 py-0.5 rounded-full transition-colors text-sm font-medium ${
          locale === "kz"
            ? "bg-white text-primary shadow-sm"
            : "text-white/80 hover:text-white"
        }`}
      >
        KZ
      </button>
    </div>
  );
}

type NavbarClientProps = {
  searchSlot: ReactNode;
  adminSlot: ReactNode;
  authSlot: ReactNode;
  cartSlot: ReactNode;
};

export default function NavbarClient({
  searchSlot,
  adminSlot,
  authSlot,
  cartSlot,
}: NavbarClientProps) {
  const { t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex flex-col">
      {/* Utility Bar */}
      <div className="h-8 bg-primary border-b border-primary-dark flex items-center justify-between px-4 md:px-8 text-[12px] md:text-[13px] font-medium text-white">
        <div className="flex items-center gap-2 min-w-0">
          <span className="truncate">{t("nav.delivery")}</span>
        </div>
        <div className="flex-shrink-0 ml-2">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Navigation */}
      <nav className="h-[60px] bg-white border-b border-border sticky top-0 z-50 flex items-center px-4 md:px-8 gap-4 md:gap-8">
        <Link href="/" className="flex items-center gap-2 text-primary flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="FreshMart Logo"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-bold text-xl tracking-tight hidden sm:inline">FreshMart</span>
        </Link>

        {/* Desktop search */}
        <div className="hidden md:flex flex-1 max-w-2xl">
          {searchSlot}
        </div>

        <Link
          href="/catalog"
          className="text-sm font-medium text-text-primary hover:text-primary transition-colors hidden md:inline"
        >
          {t("nav.catalog")}
        </Link>
        <div className="hidden md:block">
          {adminSlot}
        </div>

        {/* Desktop auth & cart */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {authSlot}
          {cartSlot}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          <span className="material-symbols-outlined text-[28px] text-text-primary">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border px-4 py-4 space-y-4 shadow-lg z-40 animate-in slide-in-from-top">
          {searchSlot}
          <div className="flex flex-col gap-3">
            <Link
              href="/catalog"
              className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.catalog")}
            </Link>
            {adminSlot}
          </div>
          <div className="flex items-center gap-6 pt-2 border-t border-border">
            {authSlot}
            {cartSlot}
          </div>
        </div>
      )}
    </header>
  );
}
