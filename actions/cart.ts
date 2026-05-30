"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result";
import { getCurrentUser } from "@/lib/session";
import { getOrCreateCart } from "@/lib/cart";

const productIdSchema = z.string().min(1);
const quantitySchema = z.coerce.number().int().min(1).max(999);

export async function addToCart(productId: string): Promise<ActionResult> {
  const idResult = productIdSchema.safeParse(productId);
  if (!idResult.success) return actionError("Неверный товар");

  const product = await prisma.product.findFirst({
    where: { id: idResult.data, isActive: true },
  });
  if (!product) return actionError("Товар недоступен");

  const cart = await getOrCreateCart();
  const existing = cart.items.find((item) => item.productId === product.id);

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId: product.id, quantity: 1 },
    });
  }

  revalidatePath("/cart");
  revalidatePath("/catalog");
  revalidatePath("/");
  return actionSuccess();
}

export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<ActionResult> {
  const qtyResult = quantitySchema.safeParse(quantity);
  if (!qtyResult.success) return actionError("Неверное количество");

  const cart = await getOrCreateCart();
  const item = cart.items.find((i) => i.id === itemId);
  if (!item) return actionError("Позиция не найдена");

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity: qtyResult.data },
  });

  revalidatePath("/cart");
  return actionSuccess();
}

export async function removeCartItem(itemId: string): Promise<ActionResult> {
  const cart = await getOrCreateCart();
  const item = cart.items.find((i) => i.id === itemId);
  if (!item) return actionError("Позиция не найдена");

  await prisma.cartItem.delete({ where: { id: itemId } });
  revalidatePath("/cart");
  return actionSuccess();
}
