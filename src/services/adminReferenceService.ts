import type { IRegionRepository } from "@/repositories/region/IRegionRepository";
import type { IWineryRepository } from "@/repositories/winery/IWineryRepository";

export interface IAdminReferenceService {
  listRegions(): Promise<unknown[]>;
  listWineries(): Promise<unknown[]>;
}

export class AdminReferenceService implements IAdminReferenceService {
  constructor(
    private readonly regionRepository: IRegionRepository,
    private readonly wineryRepository: IWineryRepository
  ) { }

  async listRegions() {
    return this.regionRepository.findMany();
  }

  async listWineries() {
    return this.wineryRepository.findMany();
  }
}
