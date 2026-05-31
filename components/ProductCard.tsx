import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export default function ProductCard({
  productId,
  title,
  manufacturer,
  price,
  imageUrl,
  minOrder,
  packaging,
  locale = "ru",
}: {
  productId: string;
  title: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  minOrder: string;
  packaging: string;
  locale?: Locale;
}) {
  return (
    <div className="product-card bg-white rounded-xl border border-border overflow-hidden flex flex-col transition-all duration-200 shadow-sm hover:-translate-y-[2px] hover:border-primary group relative">
      <div className="absolute top-2 md:top-3 left-2 md:left-3 z-10 flex flex-col gap-1.5 md:gap-2 pointer-events-none">
        <div className="flex gap-1 md:gap-1.5 pointer-events-auto">
          <span className="bg-primary text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-md flex items-center gap-0.5 md:gap-1 shadow-sm">
            <span
              className="material-symbols-outlined text-[12px] md:text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              severe_cold
            </span>{" "}
            -18°C
          </span>
          <span className="bg-accent text-white text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-md uppercase tracking-wide flex items-center shadow-sm">
            {t(locale, "product.halal")}
          </span>
        </div>
        <span className="bg-white/90 text-primary border border-primary/20 text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-md w-fit shadow-sm pointer-events-auto">
          {manufacturer}
        </span>
      </div>

      <Link href={`/product/${productId}`} className="h-36 md:h-48 relative overflow-hidden bg-background block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageUrl}
        />
      </Link>

      <div className="p-3 md:p-4 flex flex-col flex-1">
        <Link href={`/product/${productId}`}>
          <h3 className="text-xs md:text-sm font-semibold text-text-primary mb-1 line-clamp-2 leading-snug group-hover:text-primary transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>
        <p className="text-[10px] md:text-[11px] text-muted mb-1">
          {packaging} • {manufacturer}
        </p>
        <p className="text-[10px] md:text-[11px] font-medium text-primary/80 mb-2 md:mb-3">
          {t(locale, "product.min_order")} {minOrder}
        </p>

        <div className="mt-auto pt-2 md:pt-3 border-t border-border flex items-end justify-between">
          <div>
            <p className="text-[10px] md:text-xs text-muted mb-0.5">{t(locale, "product.price_per_kg")}</p>
            <p className="text-base md:text-lg font-bold text-primary">
              {price.toLocaleString("ru-RU")} ₸
            </p>
          </div>
          <AddToCartButton productId={productId} />
        </div>
      </div>
    </div>
  );
}
