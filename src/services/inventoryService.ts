import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";

type CreateInventoryInput = {
  wineId: string;
  locationId: string;
  priceGlass: number;
  priceBottle: number;
  stockQuantity: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
};

type UpdateInventoryInput = {
  locationId?: string;
  priceGlass?: number;
  priceBottle?: number;
  stockQuantity?: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
};

export async function getInventory() {
  return prisma.inventory.findMany({
    include: {
      wine: {
        include: {
          winery: true,
          region: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getInventoryById(id: string) {
  const inventory = await prisma.inventory.findUnique({
    where: { id },
    include: {
      wine: {
        include: {
          winery: true,
          region: true
        }
      }
    }
  });

  if (!inventory) {
    throw new AppError("Inventory item not found", 404);
  }

  return inventory;
}

export async function createInventory(input: CreateInventoryInput) {
  const wine = await prisma.wine.findUnique({ where: { id: input.wineId } });

  if (!wine) {
    throw new AppError("Wine not found", 404);
  }

  return prisma.inventory.create({
    data: {
      wineId: input.wineId,
      locationId: input.locationId,
      priceGlass: input.priceGlass,
      priceBottle: input.priceBottle,
      stockQuantity: input.stockQuantity,
      isAvailable: input.isAvailable ?? true,
      isFeatured: input.isFeatured ?? false
    },
    include: {
      wine: true
    }
  });
}

export async function updateInventory(id: string, input: UpdateInventoryInput) {
  await getInventoryById(id);

  return prisma.inventory.update({
    where: { id },
    data: input,
    include: {
      wine: true
    }
  });
}
