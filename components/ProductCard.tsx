import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({
  productId,
  title,
  manufacturer,
  price,
  imageUrl,
  minOrder,
  packaging,
}: {
  productId: string;
  title: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  minOrder: string;
  packaging: string;
}) {
  return (
    <div className="product-card bg-white rounded-xl border border-border overflow-hidden flex flex-col transition-all duration-200 shadow-sm hover:-translate-y-[2px] hover:border-primary group relative cursor-pointer">
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <div className="flex gap-1.5">
          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              severe_cold
            </span>{" "}
            -18°C
          </span>
          <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide flex items-center shadow-sm">
            Халяль
          </span>
        </div>
        <span className="bg-white/90 text-primary border border-primary/20 text-[10px] font-bold px-2 py-1 rounded-md w-fit shadow-sm">
          {manufacturer}
        </span>
      </div>

      <div className="h-48 relative overflow-hidden bg-background">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageUrl}
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-text-primary mb-1 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[11px] text-muted mb-1">
          {packaging} • {manufacturer}
        </p>
        <p className="text-[11px] font-medium text-primary/80 mb-3">
          Минимальный заказ — {minOrder}
        </p>

        <div className="mt-auto pt-3 border-t border-border flex items-end justify-between">
          <div>
            <p className="text-xs text-muted mb-0.5">Цена за кг</p>
            <p className="text-lg font-bold text-primary">
              {price.toLocaleString("ru-RU")} ₸
            </p>
          </div>
          <AddToCartButton productId={productId} />
        </div>
      </div>
    </div>
  );
}
