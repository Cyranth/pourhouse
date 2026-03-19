import type { IRegionRepository } from "@/repositories/region/IRegionRepository";
import type { IRatingRepository } from "@/repositories/rating/IRatingRepository";
import type { IWineRepository, WineWithInventory } from "@/repositories/wine/IWineRepository";
import type { IWineryRepository } from "@/repositories/winery/IWineryRepository";
import { AppError } from "@/utils/appError";

export type WineListItem = {
  id: string;
  slug: string;
  name: string;
  vintage: number;
  country: string;
  description: string;
  imageUrl: string;
  winery: {
    id: string;
    name: string;
  };
  region: {
    id: string;
    name: string;
  };
  pricing: {
    glass: number | null;
    bottle: number | null;
  };
};

export type CreateWineInput = {
  name: string;
  slug: string;
  vintage: number;
  wineryId: string;
  regionId: string;
  country: string;
  grapeVarieties: string[];
  alcoholPercent: number;
  description: string;
  imageUrl: string;
  squareItemId?: string | null;
};

export class WineService {
  public constructor(
    private readonly wineRepository: IWineRepository,
    private readonly wineryRepository: IWineryRepository,
    private readonly regionRepository: IRegionRepository,
    private readonly ratingRepository: IRatingRepository
  ) { }

  public async getWines() {
    const wines = await this.wineRepository.findMany();

    return wines.map((wine) => this.toWineListItem(wine));
  }

  public async getWineById(id: string) {
    const wine = await this.wineRepository.findByIdWithInventory(id);

    if (!wine) {
      throw new AppError("Wine not found", 404);
    }

    return wine;
  }

  public async createWine(input: CreateWineInput) {
    const winery = await this.wineryRepository.findById(input.wineryId);
    const region = await this.regionRepository.findById(input.regionId);

    if (!winery) {
      throw new AppError("Winery not found", 404);
    }

    if (!region) {
      throw new AppError("Region not found", 404);
    }

    const existingWine = await this.wineRepository.findByUniqueNameWineryVintage({
      name: input.name,
      wineryId: input.wineryId,
      vintage: input.vintage
    });

    if (existingWine) {
      throw new AppError("Wine with the same name, winery, and vintage already exists", 409);
    }

    return this.wineRepository.create(input);
  }

  public async searchWines(query: string) {
    return this.wineRepository.search(query);
  }

  public async getWineRatings(wineId: string) {
    const wine = await this.wineRepository.findByIdWithInventory(wineId);

    if (!wine) {
      throw new AppError("Wine not found", 404);
    }

    return this.ratingRepository.findByWineId(wineId);
  }

  private toWineListItem(wine: WineWithInventory): WineListItem {
    const glassPrices = wine.inventory.map((item) => Number(item.priceGlass));
    const bottlePrices = wine.inventory.map((item) => Number(item.priceBottle));

    return {
      id: wine.id,
      slug: wine.slug,
      name: wine.name,
      vintage: wine.vintage,
      country: wine.country,
      description: wine.description,
      imageUrl: wine.imageUrl,
      winery: {
        id: wine.winery.id,
        name: wine.winery.name
      },
      region: {
        id: wine.region.id,
        name: wine.region.name
      },
      pricing: {
        glass: glassPrices.length > 0 ? Math.min(...glassPrices) : null,
        bottle: bottlePrices.length > 0 ? Math.min(...bottlePrices) : null
      }
    };
  }
}
