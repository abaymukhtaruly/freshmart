import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const val = cookieStore.get("fm_locale")?.value;
  if (val === "kz" || val === "ru") return val;
  return defaultLocale;
}
