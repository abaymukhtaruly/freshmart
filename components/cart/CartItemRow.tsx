"use client";

import { useTransition } from "react";
import { removeCartItem, updateCartItemQuantity } from "@/actions/cart";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";

type CartItemRowProps = {
  itemId: string;
  title: string;
  manufacturer: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  inactive?: boolean;
};

export default function CartItemRow({
  itemId,
  title,
  manufacturer,
  price,
  quantity,
  imageUrl,
  inactive,
}: CartItemRowProps) {
  const [pending, startTransition] = useTransition();
  const { locale } = useLocale();

  const lineTotal = price * quantity;
  const localeCode = locale === "kz" ? "kk-KZ" : "ru-RU";

  return (
    <div
      className={`flex gap-4 p-4 border-b border-border last:border-0 ${inactive ? "opacity-50" : ""}`}
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-background flex-shrink-0">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">
            <span className="material-symbols-outlined">image</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2">{title}</h3>
        <p className="text-xs text-muted mt-0.5">{manufacturer}</p>
        {inactive && (
          <p className="text-xs text-accent mt-1">{locale === "kz" ? "Тауар енді қол жетімді емес" : "Товар больше недоступен"}</p>
        )}
        <p className="text-sm font-bold text-primary mt-2">
          {price.toLocaleString(localeCode)} ₸ / кг
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          type="button"
          disabled={pending || inactive}
          onClick={() => startTransition(() => void removeCartItem(itemId))}
          className="text-xs text-muted hover:text-accent disabled:opacity-50"
        >
          {t(locale, "cart.remove")}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={pending || inactive || quantity <= 1}
            onClick={() =>
              startTransition(() => void updateCartItemQuantity(itemId, quantity - 1))
            }
            className="h-8 w-8 rounded border border-border text-sm hover:border-primary disabled:opacity-50"
          >
            −
          </button>
          <span className="text-sm font-medium w-6 text-center">{quantity}</span>
          <button
            type="button"
            disabled={pending || inactive}
            onClick={() =>
              startTransition(() => void updateCartItemQuantity(itemId, quantity + 1))
            }
            className="h-8 w-8 rounded border border-border text-sm hover:border-primary disabled:opacity-50"
          >
            +
          </button>
        </div>

        <p className="text-sm font-bold text-text-primary">
          {lineTotal.toLocaleString(localeCode)} ₸
        </p>
      </div>
    </div>
  );
}
