"use client";

import { useEffect } from "react";
import AuthForm, { AuthFormFooter } from "@/components/auth/AuthForm";
import { login } from "@/actions/auth";

export default function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-text-primary transition-colors"
          aria-label="Закрыть"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2 className="text-2xl font-bold text-text-primary mb-2">Вход</h2>
        <p className="text-sm text-muted mb-6">
          Войдите, чтобы добавлять товары в корзину и оформлять заказы.
        </p>

        <AuthForm action={login} submitLabel="Войти" fields="login" />
        <AuthFormFooter mode="login" />
      </div>
    </div>
  );
}
