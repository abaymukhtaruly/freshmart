import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductById } from "@/lib/queries";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product || !product.isActive) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-8 py-10">
        <div className="mb-6">
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
            Назад в каталог
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col md:flex-row gap-10 p-8 md:p-10 shadow-sm">
          <div className="w-full md:w-1/2 relative h-[300px] md:h-[500px] bg-background rounded-xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                product.imageUrl ||
                "https://images.unsplash.com/photo-1604503468506-440b703b1c92?w=800&h=600&fit=crop"
              }
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    severe_cold
                  </span>{" "}
                  -18°C
                </span>
                <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center shadow-sm">
                  Халяль
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col">
            <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1.5 rounded-lg w-fit shadow-sm mb-4">
              {product.manufacturer.name}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-tight">
              {product.title}
            </h1>
            
            <div className="space-y-5 mb-10 flex-1">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-muted font-medium">Категория:</span>
                <span className="font-semibold text-text-primary">{product.category.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-muted font-medium">Фасовка:</span>
                <span className="font-semibold text-text-primary">{product.packaging}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-muted font-medium">Минимальный заказ:</span>
                <span className="font-semibold text-text-primary">{product.minOrder}</span>
              </div>
              {product.description && (
                <div className="pt-2">
                  <span className="text-muted font-medium block mb-2">Описание:</span>
                  <p className="text-sm leading-relaxed text-text-primary/80">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-auto bg-background rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between border border-border gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted mb-1 font-medium">Цена за кг</p>
                <p className="text-4xl font-bold text-primary">
                  {product.price.toLocaleString("ru-RU")} ₸
                </p>
              </div>
              <div className="w-full sm:w-auto transform scale-110 sm:scale-125 origin-center sm:origin-right">
                <AddToCartButton productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
