import type { Region } from "@prisma/client";
import type { IRegionRepository } from "@/repositories/region/IRegionRepository";
import type { IWineryRepository } from "@/repositories/winery/IWineryRepository";
import { describe, expect, it, vi } from "vitest";
import { AdminReferenceService } from "@/services/adminReferenceService";

describe("AdminReferenceService", () => {
  it("lists regions from the repository", async () => {
    const regionRepository: IRegionRepository = {
      findMany: vi.fn().mockResolvedValue([{ id: "region-1", name: "Okanagan" }] as Region[]),
      findById: vi.fn()
    };
    const wineryRepository: IWineryRepository = {
      findMany: vi.fn().mockResolvedValue([]),
      findById: vi.fn()
    };
    const service = new AdminReferenceService(regionRepository, wineryRepository);

    await expect(service.listRegions()).resolves.toEqual([{ id: "region-1", name: "Okanagan" }]);
    expect(regionRepository.findMany).toHaveBeenCalledTimes(1);
  });

  it("lists wineries from the repository", async () => {
    const regionRepository: IRegionRepository = {
      findMany: vi.fn().mockResolvedValue([]),
      findById: vi.fn()
    };
    const wineryRepository: IWineryRepository = {
      findMany: vi.fn().mockResolvedValue([{ id: "winery-1", name: "Lightning Rock" }]),
      findById: vi.fn()
    };
    const service = new AdminReferenceService(regionRepository, wineryRepository);

    await expect(service.listWineries()).resolves.toEqual([{ id: "winery-1", name: "Lightning Rock" }]);
    expect(wineryRepository.findMany).toHaveBeenCalledTimes(1);
  });
});
