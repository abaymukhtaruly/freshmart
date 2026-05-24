import { Role } from "@prisma/client";
import { getCurrentUser } from "@/lib/session";
import type { User } from "@prisma/client";

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return getAdminEmails().includes(normalized);
}

export async function isAdminUser(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === Role.ADMIN;
}

export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Войдите в аккаунт администратора");
  }
  if (user.role !== Role.ADMIN) {
    throw new Error("Нет прав администратора");
  }
  return user;
}

export async function assertAdminAction(): Promise<{ error: string } | null> {
  try {
    await requireAdmin();
    return null;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Доступ запрещён",
    };
  }
}
