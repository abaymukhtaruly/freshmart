"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result";
import { assertAdminAction } from "@/lib/auth";

const manufacturerSchema = z.object({
  name: z.string().trim().min(1, "Название обязательно"),
  description: z
    .string()
    .optional()
    .transform((v) => (v && v.trim().length > 0 ? v.trim() : undefined)),
});

export async function createManufacturer(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const denied = await assertAdminAction();
  if (denied) return actionError(denied.error);

  const parsed = manufacturerSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Неверные данные");
  }

  try {
    await prisma.manufacturer.create({ data: parsed.data });
    revalidatePath("/admin/manufacturers");
    revalidatePath("/catalog");
    return actionSuccess();
  } catch {
    return actionError("Не удалось создать производителя. Возможно, название уже занято.");
  }
}

export async function updateManufacturer(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const denied = await assertAdminAction();
  if (denied) return actionError(denied.error);

  const parsed = manufacturerSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Неверные данные");
  }

  try {
    await prisma.manufacturer.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath("/admin/manufacturers");
    revalidatePath("/catalog");
    return actionSuccess();
  } catch {
    return actionError("Не удалось обновить производителя.");
  }
}

export async function deleteManufacturer(id: string): Promise<ActionResult> {
  const denied = await assertAdminAction();
  if (denied) return actionError(denied.error);

  try {
    const productCount = await prisma.product.count({
      where: { manufacturerId: id },
    });
    if (productCount > 0) {
      return actionError("Нельзя удалить производителя с привязанными товарами.");
    }
    await prisma.manufacturer.delete({ where: { id } });
    revalidatePath("/admin/manufacturers");
    revalidatePath("/catalog");
    return actionSuccess();
  } catch {
    return actionError("Не удалось удалить производителя.");
  }
}
