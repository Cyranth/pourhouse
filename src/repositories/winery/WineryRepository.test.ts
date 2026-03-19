import { describe, expect, it, vi } from "vitest";
import { WineryRepository } from "@/repositories/winery/WineryRepository";

describe("WineryRepository", () => {
  it("findById queries the winery by id", async () => {
    const findUnique = vi.fn().mockResolvedValue(null);
    const prisma = {
      winery: {
        findUnique
      }
    } as never;

    const repository = new WineryRepository(prisma);

    await repository.findById("winery-1");

    expect(findUnique).toHaveBeenCalledWith({ where: { id: "winery-1" } });
  });
});
