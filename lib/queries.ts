import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { parent: true, _count: { select: { products: true } } },
  });
}

export async function getManufacturers() {
  return prisma.manufacturer.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getActiveProducts(filters?: {
  categoryId?: string;
  manufacturerId?: string;
  search?: string;
}) {
  const where: Prisma.ProductWhereInput = { isActive: true };

  if (filters?.categoryId) where.categoryId = filters.categoryId;
  if (filters?.manufacturerId) where.manufacturerId = filters.manufacturerId;
  if (filters?.search) {
    where.title = { contains: filters.search, mode: "insensitive" };
  }

  return prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { category: true, manufacturer: true },
  });
}

export async function getAdminProducts(filters?: {
  categoryId?: string;
  search?: string;
  status?: "active" | "inactive" | "all";
}) {
  const where: Prisma.ProductWhereInput = {};

  if (filters?.categoryId) where.categoryId = filters.categoryId;
  if (filters?.search) {
    where.title = { contains: filters.search, mode: "insensitive" };
  }
  if (filters?.status === "active") where.isActive = true;
  if (filters?.status === "inactive") where.isActive = false;

  return prisma.product.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: { category: true, manufacturer: true },
  });
}

export async function getDashboardStats() {
  const [products, categories, manufacturers, activeProducts] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.manufacturer.count(),
    prisma.product.count({ where: { isActive: true } }),
  ]);

  return { products, categories, manufacturers, activeProducts };
}
