import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";

type CreateRatingInput = {
  userId: string;
  wineId: string;
  rating: number;
  notes: string;
};

export async function createRating(input: CreateRatingInput) {
  if (input.rating < 1 || input.rating > 5) {
    throw new AppError("Rating must be between 1 and 5", 400);
  }

  const wine = await prisma.wine.findUnique({ where: { id: input.wineId } });

  if (!wine) {
    throw new AppError("Wine not found", 404);
  }

  return prisma.rating.create({
    data: {
      userId: input.userId,
      wineId: input.wineId,
      rating: input.rating,
      notes: input.notes
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      wine: {
        select: {
          id: true,
          name: true,
          vintage: true
        }
      }
    }
  });
}
