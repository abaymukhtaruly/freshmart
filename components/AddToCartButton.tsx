"use client";

import { useTransition, useState } from "react";
import { addToCart } from "@/actions/cart";
import LoginModal from "@/components/LoginModal";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [pending, startTransition] = useTransition();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if inside a Link
    startTransition(async () => {
      const result = await addToCart(productId);
      if (!result.success && result.errorCode === "UNAUTHORIZED") {
        setShowLoginModal(true);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={handleAdd}
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

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}
