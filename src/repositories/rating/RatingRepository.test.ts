import { describe, expect, it, vi } from "vitest";
import { RatingRepository } from "@/repositories/rating/RatingRepository";

describe("RatingRepository", () => {
  it("create includes user and wine projections", async () => {
    const create = vi.fn().mockResolvedValue(null);
    const prisma = {
      rating: {
        create
      }
    } as never;

    const repository = new RatingRepository(prisma);
    const input = {
      user: { connect: { id: "user-1" } },
      wine: { connect: { id: "wine-1" } },
      rating: 5,
      notes: "Excellent"
    };

    await repository.create(input);

    expect(create).toHaveBeenCalledWith({
      data: input,
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
  });

  it("findByWineId includes user projection and sorts by newest first", async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    const prisma = {
      rating: {
        findMany
      }
    } as never;

    const repository = new RatingRepository(prisma);

    await repository.findByWineId("wine-1");

    expect(findMany).toHaveBeenCalledWith({
      where: { wineId: "wine-1" },
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
  });
});
