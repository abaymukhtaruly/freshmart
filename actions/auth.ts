"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result";
import { createUserSession, destroyUserSession } from "@/lib/session";
import { mergeGuestCartIntoUser } from "@/lib/cart";

// TODO: Add email verification, rate limiting, and OAuth providers.

const registerSchema = z.object({
  name: z.string().trim().min(1, "Введите имя"),
  email: z.email("Некорректный email"),
  password: z.string().min(6, "Пароль — минимум 6 символов"),
});

const loginSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export async function register(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Неверные данные");
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return actionError("Пользователь с таким email уже существует");
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
    },
  });

  await createUserSession(user.id);
  await mergeGuestCartIntoUser(user.id);
  redirect("/account");
}

export async function login(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Неверные данные");
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user?.passwordHash) {
    return actionError("Неверный email или пароль");
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    return actionError("Неверный email или пароль");
  }

  await createUserSession(user.id);
  await mergeGuestCartIntoUser(user.id);
  redirect("/account");
}

export async function logout(): Promise<void> {
  await destroyUserSession();
  redirect("/");
}
