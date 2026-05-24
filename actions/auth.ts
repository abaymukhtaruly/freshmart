"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result";
import { Role } from "@prisma/client";
import { createUserSession, destroyUserSession } from "@/lib/session";
import { mergeGuestCartIntoUser } from "@/lib/cart";
import { isAdminEmail } from "@/lib/auth";

function safeCallbackUrl(value: FormDataEntryValue | null): string {
  const url = typeof value === "string" ? value : "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  return "/account";
}

async function applyAdminRole(userId: string, email: string) {
  if (!isAdminEmail(email)) return;
  await prisma.user.update({
    where: { id: userId },
    data: { role: Role.ADMIN },
  });
}

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
  const role = isAdminEmail(parsed.data.email) ? Role.ADMIN : Role.CUSTOMER;
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role,
    },
  });

  await createUserSession(user.id);
  await mergeGuestCartIntoUser(user.id);
  redirect(role === Role.ADMIN ? "/admin" : "/account");
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

  await applyAdminRole(user.id, parsed.data.email);
  const refreshed = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });

  await createUserSession(refreshed.id);
  await mergeGuestCartIntoUser(refreshed.id);

  const callbackUrl = safeCallbackUrl(formData.get("callbackUrl"));
  if (refreshed.role === Role.ADMIN && callbackUrl.startsWith("/admin")) {
    redirect(callbackUrl);
  }
  redirect(refreshed.role === Role.ADMIN ? "/admin" : callbackUrl);
}

export async function logout(): Promise<void> {
  await destroyUserSession();
  redirect("/");
}
