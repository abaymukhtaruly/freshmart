import Link from "next/link";
import { getOrCreateCart, getCartTotals } from "@/lib/cart";

export default async function NavbarCart() {
  let itemCount = 0;
  let total = 0;

  try {
    const cart = await getOrCreateCart();
    const totals = getCartTotals(cart);
    itemCount = totals.itemCount;
    total = totals.total;
  } catch {
    // DB unavailable
  }

  return (
    <Link
      href="/cart"
      className="flex flex-col items-center text-text-primary hover:text-primary transition-colors relative group"
    >
      <div className="relative">
        <span
          className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          shopping_cart
        </span>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-4 min-w-4 px-0.5 rounded-full flex items-center justify-center border border-white">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </div>
      <span className="text-[11px] font-medium mt-0.5">
        {total > 0 ? `${total.toLocaleString("ru-RU")} ₸` : "Корзина"}
      </span>
    </Link>
  );
}
