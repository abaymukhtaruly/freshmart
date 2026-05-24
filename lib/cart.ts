import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { CART_SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/constants";

const cartInclude = {
  items: {
    include: {
      product: { include: { manufacturer: true } },
    },
    orderBy: { id: "asc" as const },
  },
};

export async function getGuestSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CART_SESSION_COOKIE)?.value;
  if (existing) return existing;

  const sessionId = randomUUID();
  cookieStore.set(CART_SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return sessionId;
}

export async function getOrCreateCart() {
  const user = await getCurrentUser();

  if (user) {
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: cartInclude,
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: cartInclude,
      });
    }
    return cart;
  }

  const sessionId = await getGuestSessionId();
  let cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: cartInclude,
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { sessionId },
      include: cartInclude,
    });
  }
  return cart;
}

export type CartWithItems = Awaited<ReturnType<typeof getOrCreateCart>>;

export function getCartTotals(cart: CartWithItems) {
  const activeItems = cart.items.filter((item) => item.product.isActive);
  const itemCount = activeItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = activeItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );
  return { itemCount, total };
}

/** Attach guest cart items to the user cart after login/register. */
export async function mergeGuestCartIntoUser(userId: string): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(CART_SESSION_COOKIE)?.value;
  if (!sessionId) return;

  const guestCart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });
  if (!guestCart || guestCart.items.length === 0) return;

  let userCart = await prisma.cart.findUnique({ where: { userId } });
  if (!userCart) {
    userCart = await prisma.cart.create({ data: { userId } });
  }

  for (const item of guestCart.items) {
    const existing = await prisma.cartItem.findFirst({
      where: { cartId: userCart.id, productId: item.productId },
    });
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + item.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
  }

  await prisma.cart.delete({ where: { id: guestCart.id } });
  cookieStore.delete(CART_SESSION_COOKIE);
}
