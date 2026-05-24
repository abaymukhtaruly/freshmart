"use server";

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { put } from "@vercel/blob";
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result";
import { assertAdminAction } from "@/lib/auth";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function uploadProductImage(
  formData: FormData
): Promise<ActionResult<{ url: string }>> {
  const denied = await assertAdminAction();
  if (denied) return actionError(denied.error);

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return actionError("Выберите файл изображения");
  }
  if (file.size > MAX_BYTES) {
    return actionError("Файл слишком большой (макс. 5 МБ)");
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return actionError("Допустимы только JPEG, PNG, WebP или GIF");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `products/${Date.now()}-${safeName}`;

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(key, file, {
        access: "public",
        addRandomSuffix: true,
      });
      return actionSuccess({ url: blob.url });
    }

    if (process.env.NODE_ENV === "development") {
      const uploadsDir = join(process.cwd(), "public", "uploads", "products");
      await mkdir(uploadsDir, { recursive: true });
      const filename = `${Date.now()}-${safeName}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(join(uploadsDir, filename), buffer);
      return actionSuccess({ url: `/uploads/products/${filename}` });
    }

    return actionError(
      "Загрузка не настроена. Добавьте BLOB_READ_WRITE_TOKEN в Vercel или используйте URL."
    );
  } catch {
    return actionError("Не удалось загрузить изображение");
  }
}
