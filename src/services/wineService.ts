import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";

type CreateWineInput = {
  name: string;
  vintage: number;
  wineryId: string;
  regionId: string;
  country: string;
  grapeVarieties: string[];
  alcoholPercent: number;
  description: string;
  imageUrl: string;
};

export async function getWines() {
  return prisma.wine.findMany({
    include: {
      winery: true,
      region: true
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getWineById(id: string) {
  const wine = await prisma.wine.findUnique({
    where: { id },
    include: {
      winery: true,
      region: true,
      inventory: true
    }
  });

  if (!wine) {
    throw new AppError("Wine not found", 404);
  }

  return wine;
}

export async function createWine(input: CreateWineInput) {
  const winery = await prisma.winery.findUnique({ where: { id: input.wineryId } });
  const region = await prisma.region.findUnique({ where: { id: input.regionId } });

  if (!winery) {
    throw new AppError("Winery not found", 404);
  }

  if (!region) {
    throw new AppError("Region not found", 404);
  }

  const existingWine = await prisma.wine.findUnique({
    where: {
      name_wineryId_vintage: {
        name: input.name,
        wineryId: input.wineryId,
        vintage: input.vintage
      }
    }
  });

  if (existingWine) {
    throw new AppError("Wine with the same name, winery, and vintage already exists", 409);
  }

  return prisma.wine.create({
    data: input,
    include: {
      winery: true,
      region: true
    }
  });
}

export async function searchWines(query: string) {
  return prisma.wine.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { country: { contains: query, mode: "insensitive" } },
        { winery: { name: { contains: query, mode: "insensitive" } } },
        { region: { name: { contains: query, mode: "insensitive" } } }
      ]
    },
    include: {
      winery: true,
      region: true
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getWineRatings(wineId: string) {
  const wine = await prisma.wine.findUnique({ where: { id: wineId } });

  if (!wine) {
    throw new AppError("Wine not found", 404);
  }

  return prisma.rating.findMany({
    where: { wineId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}
