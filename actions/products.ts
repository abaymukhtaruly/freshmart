"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result";

// TODO: Protect admin actions with authentication (require ADMIN role).

const urlSchema = z
  .string()
  .url("Укажите корректный URL изображения")
  .or(z.literal(""))
  .transform((v) => (v.length > 0 ? v : undefined));

const productSchema = z.object({
  title: z.string().trim().min(1, "Название обязательно"),
  description: z
    .string()
    .optional()
    .transform((v) => (v && v.trim().length > 0 ? v.trim() : undefined)),
  sku: z
    .string()
    .optional()
    .transform((v) => (v && v.trim().length > 0 ? v.trim() : undefined)),
  price: z.coerce.number().positive("Цена должна быть больше 0"),
  stockQuantity: z.coerce.number().int().min(0, "Остаток не может быть отрицательным"),
  imageUrl: urlSchema,
  minOrder: z.string().trim().min(1, "Минимальный заказ обязателен"),
  packaging: z.string().trim().min(1, "Упаковка обязательна"),
  isHalal: z.coerce.boolean(),
  temperature: z.string().trim().min(1).default("-18°C"),
  categoryId: z.string().min(1, "Выберите категорию"),
  manufacturerId: z.string().min(1, "Выберите производителя"),
});

function parseProductForm(formData: FormData) {
  return productSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    sku: formData.get("sku"),
    price: formData.get("price"),
    stockQuantity: formData.get("stockQuantity"),
    imageUrl: formData.get("imageUrl"),
    minOrder: formData.get("minOrder"),
    packaging: formData.get("packaging"),
    isHalal: formData.get("isHalal") === "on" || formData.get("isHalal") === "true",
    temperature: formData.get("temperature") || "-18°C",
    categoryId: formData.get("categoryId"),
    manufacturerId: formData.get("manufacturerId"),
  });
}

export async function createProduct(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parseProductForm(formData);

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Неверные данные");
  }

  try {
    const product = await prisma.product.create({
      data: {
        ...parsed.data,
        imageUrl: parsed.data.imageUrl ?? null,
      },
    });
    revalidatePath("/admin/products");
    revalidatePath("/catalog");
    revalidatePath("/");
    redirect(`/admin/products/${product.id}/edit`);
  } catch {
    return actionError("Не удалось создать товар.");
  }
}

export async function updateProduct(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parseProductForm(formData);

  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Неверные данные");
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        ...parsed.data,
        imageUrl: parsed.data.imageUrl ?? null,
      },
    });
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}/edit`);
    revalidatePath("/catalog");
    revalidatePath("/");
    return actionSuccess();
  } catch {
    return actionError("Не удалось обновить товар.");
  }
}

export async function deactivateProduct(id: string): Promise<ActionResult> {
  try {
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
    revalidatePath("/admin/products");
    revalidatePath("/catalog");
    revalidatePath("/");
    return actionSuccess();
  } catch {
    return actionError("Не удалось деактивировать товар.");
  }
}

export async function activateProduct(id: string): Promise<ActionResult> {
  try {
    await prisma.product.update({
      where: { id },
      data: { isActive: true },
    });
    revalidatePath("/admin/products");
    revalidatePath("/catalog");
    revalidatePath("/");
    return actionSuccess();
  } catch {
    return actionError("Не удалось активировать товар.");
  }
}
