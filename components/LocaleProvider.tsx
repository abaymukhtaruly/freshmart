"use client";

import { createContext, useContext, useState, useCallback, useTransition } from "react";
import type { Locale, TranslationKey } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [, startTransition] = useTransition();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      document.cookie = `fm_locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
      setLocaleState(newLocale);
      startTransition(() => {
        window.location.reload();
      });
    },
    []
  );

  const translations = getTranslations(locale);
  const t = useCallback(
    (key: TranslationKey) => translations[key] || key,
    [translations]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
