"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result";
import { assertAdminAction } from "@/lib/auth";

const categorySchema = z.object({
  name: z.string().trim().min(1, "Название обязательно"),
  parentId: z
    .string()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
});

export async function createCategory(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const denied = await assertAdminAction();
  if (denied) return actionError(denied.error);

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    parentId: formData.get("parentId"),
  });

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Неверные данные");
  }

  try {
    await prisma.category.create({ data: parsed.data });
    revalidatePath("/admin/categories");
    revalidatePath("/catalog");
    return actionSuccess();
  } catch {
    return actionError("Не удалось создать категорию. Возможно, название уже занято.");
  }
}

export async function updateCategory(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const denied = await assertAdminAction();
  if (denied) return actionError(denied.error);

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    parentId: formData.get("parentId"),
  });

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Неверные данные");
  }

  try {
    await prisma.category.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath("/admin/categories");
    revalidatePath("/catalog");
    return actionSuccess();
  } catch {
    return actionError("Не удалось обновить категорию.");
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const denied = await assertAdminAction();
  if (denied) return actionError(denied.error);

  try {
    const productCount = await prisma.product.count({ where: { categoryId: id } });
    if (productCount > 0) {
      return actionError("Нельзя удалить категорию с привязанными товарами.");
    }
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidatePath("/catalog");
    return actionSuccess();
  } catch {
    return actionError("Не удалось удалить категорию.");
  }
}
