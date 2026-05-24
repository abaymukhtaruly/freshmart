import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { AdminHomeLink } from "@/components/admin/AdminCatalogActions";
import { getActiveProducts } from "@/lib/queries";

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getActiveProducts>> = [];

  try {
    const products = await getActiveProducts();
    featured = products.slice(0, 4);
  } catch {
    // DB not connected — show hero only
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-8 py-6">
        <div className="bg-background-dark rounded-xl mb-8 overflow-hidden flex items-stretch h-[240px] relative">
          <div className="p-10 flex-1 flex flex-col justify-center z-10">
            <span className="inline-block bg-white text-background-dark text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit shadow-sm">
              Опт и Розница
            </span>
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight max-w-md">
              Свежезамороженные продукты высшего качества
            </h1>
            <p className="text-sm text-white/80 max-w-sm mb-6">
              Строгий контроль температуры -18°C от склада до вашей двери. Гарантия свежести.
            </p>
            <Link
              href="/catalog"
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold w-fit hover:bg-primary-dark transition-colors"
            >
              Смотреть каталог
            </Link>
          </div>
          <div className="w-1/2 relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark to-transparent z-10 w-32" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Fresh Salmon"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn4OvYcCjfTVEVzSeOrk5RZQyuz8zStdyJm4f66hPPt4fCBElURQlVHAR-rL_9g1cM9DPKBz12hNQPG0rQTPSD0UExSVyTpWldaUoczHPS-o04PtBGCBOn0p9wiX8kEdTLpRyyqL1hJyyUHwGbERl87W8ITga6p1ZHSGVZFwffECMu-RRkq1oft2TVtBoZLiNypUj4v45XjDwWye73mLVJKQyeytsBfT7YMIAt-frLWaFxhh6ml0e7Kd8o5WReSIg1NJup0y_Ovkw"
            />
          </div>
        </div>

        {featured.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary">Популярные товары</h2>
              <Link
                href="/catalog"
                className="text-sm font-medium text-primary hover:underline"
              >
                Весь каталог →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((product) => (
                <ProductCard
                  key={product.id}
                  productId={product.id}
                  title={product.title}
                  manufacturer={product.manufacturer.name}
                  price={product.price}
                  imageUrl={
                    product.imageUrl ??
                    "https://images.unsplash.com/photo-1604503468506-440b703b1c92?w=400&h=300&fit=crop"
                  }
                  minOrder={product.minOrder}
                  packaging={product.packaging}
                />
              ))}
            </div>
          </>
        )}

        {featured.length === 0 && (
          <div className="bg-white border border-border rounded-xl p-8 text-center">
            <p className="text-muted mb-4">
              Каталог пуст. Настройте данные в админ-панели.
            </p>
            <AdminHomeLink />
          </div>
        )}
      </main>
    </>
  );
}
