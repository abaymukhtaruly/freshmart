"use client";

import { useTransition } from "react";
import { addToCart } from "@/actions/cart";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(() => {
          void addToCart(productId);
        })
      }
      className="bg-background text-primary border border-primary/20 hover:bg-primary hover:text-white h-10 w-10 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
      aria-label="Добавить в корзину"
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: "'FILL' 0" }}
      >
        {pending ? "hourglass_empty" : "add_shopping_cart"}
      </span>
    </button>
  );
}
