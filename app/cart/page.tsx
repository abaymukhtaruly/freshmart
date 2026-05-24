import Link from "next/link";
import Navbar from "@/components/Navbar";
import CartItemRow from "@/components/cart/CartItemRow";
import { getOrCreateCart, getCartTotals } from "@/lib/cart";

export default async function CartPage() {
  let cart: Awaited<ReturnType<typeof getOrCreateCart>> | null = null;

  try {
    cart = await getOrCreateCart();
  } catch {
    // DB unavailable
  }

  const activeItems = cart?.items.filter((item) => item.product.isActive) ?? [];
  const inactiveItems = cart?.items.filter((item) => !item.product.isActive) ?? [];
  const { itemCount, total } = cart ? getCartTotals(cart) : { itemCount: 0, total: 0 };

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-8 py-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Корзина</h1>
        <p className="text-sm text-muted mb-8">
          {itemCount > 0
            ? `${itemCount} поз. • ${total.toLocaleString("ru-RU")} ₸`
            : "Корзина пуста"}
        </p>

        {!cart || cart.items.length === 0 ? (
          <div className="bg-white border border-border rounded-xl p-12 text-center">
            <span
              className="material-symbols-outlined text-5xl text-muted mb-4"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              shopping_cart
            </span>
            <p className="text-muted mb-6">Добавьте товары из каталога</p>
            <Link
              href="/catalog"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm mb-6">
              {activeItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  itemId={item.id}
                  title={item.product.title}
                  manufacturer={item.product.manufacturer.name}
                  price={item.product.price}
                  quantity={item.quantity}
                  imageUrl={item.product.imageUrl}
                />
              ))}
              {inactiveItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  itemId={item.id}
                  title={item.product.title}
                  manufacturer={item.product.manufacturer.name}
                  price={item.product.price}
                  quantity={item.quantity}
                  imageUrl={item.product.imageUrl}
                  inactive
                />
              ))}
            </div>

            <div className="bg-white border border-border rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Итого</p>
                <p className="text-2xl font-bold text-primary">
                  {total.toLocaleString("ru-RU")} ₸
                </p>
              </div>
              {activeItems.length > 0 ? (
                <Link
                  href="/login"
                  className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors"
                >
                  Оформить заказ
                </Link>
              ) : (
                <Link
                  href="/catalog"
                  className="text-primary font-medium hover:underline"
                >
                  В каталог
                </Link>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
