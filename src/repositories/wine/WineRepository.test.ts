import { describe, expect, it, vi } from "vitest";
import { WineRepository } from "@/repositories/wine/WineRepository";

describe("WineRepository", () => {
  it("findMany returns only wines with available inventory", async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    const prisma = {
      wine: {
        findMany
      }
    } as never;

    const repository = new WineRepository(prisma);

    await repository.findMany();

    expect(findMany).toHaveBeenCalledWith({
      where: {
        inventory: {
          some: {
            isAvailable: true
          }
        }
      },
      include: {
        winery: true,
        region: true,
        inventory: {
          where: {
            isAvailable: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  });
});
