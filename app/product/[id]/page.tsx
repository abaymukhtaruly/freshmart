import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductById } from "@/lib/queries";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/i18n";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);
  const locale = await getLocale();

  if (!product || !product.isActive) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-8 py-6 md:py-10">
        <div className="mb-4 md:mb-6">
          <Link
            href="/catalog"
            className="text-sm font-medium text-muted hover:text-primary transition-colors flex items-center gap-1 w-fit"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              arrow_back
            </span>
            {t(locale, "product.back_to_catalog")}
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-8 lg:p-10 shadow-sm">
          <div className="w-full md:w-1/2 relative h-[250px] md:h-[500px] bg-background rounded-xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                product.imageUrl ||
                "https://images.unsplash.com/photo-1604503468506-440b703b1c92?w=800&h=600&fit=crop"
              }
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10 flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="bg-primary text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex items-center gap-1 md:gap-1.5 shadow-sm">
                  <span
                    className="material-symbols-outlined text-[14px] md:text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    severe_cold
                  </span>{" "}
                  -18°C
                </span>
                <span className="bg-accent text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-lg uppercase tracking-wider flex items-center shadow-sm">
                  {t(locale, "product.halal")}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col">
            <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1.5 rounded-lg w-fit shadow-sm mb-3 md:mb-4">
              {product.manufacturer.name}
            </span>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4 md:mb-6 leading-tight">
              {product.title}
            </h1>
            
            <div className="space-y-3 md:space-y-5 mb-6 md:mb-10 flex-1">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-muted font-medium text-sm md:text-base">{t(locale, "product.category_label")}</span>
                <span className="font-semibold text-text-primary text-sm md:text-base">{product.category.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-muted font-medium text-sm md:text-base">{t(locale, "product.packaging_label")}</span>
                <span className="font-semibold text-text-primary text-sm md:text-base">{product.packaging}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-muted font-medium text-sm md:text-base">{t(locale, "product.min_order_label")}</span>
                <span className="font-semibold text-text-primary text-sm md:text-base">{product.minOrder}</span>
              </div>
              {product.description && (
                <div className="pt-2">
                  <span className="text-muted font-medium block mb-2 text-sm md:text-base">{t(locale, "product.description_label")}</span>
                  <p className="text-sm leading-relaxed text-text-primary/80">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-auto bg-background rounded-2xl p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between border border-border gap-4 md:gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted mb-1 font-medium">{t(locale, "product.price_per_kg")}</p>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {product.price.toLocaleString("ru-RU")} ₸
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-2">
                <div className="w-full sm:w-auto transform scale-110 sm:scale-125 origin-center sm:origin-right">
                  <AddToCartButton productId={product.id} />
                </div>
                <p className="text-[11px] text-muted text-center sm:text-right max-w-[200px] mt-2 sm:mt-1 leading-tight">
                  {t(locale, "product.add_note")} ({product.packaging})
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
