import type { IInventoryRepository } from "@/repositories/inventory/IInventoryRepository";
import type { IWineRepository } from "@/repositories/wine/IWineRepository";
import { AppError } from "@/utils/appError";

export type CreateInventoryInput = {
  wineVariationId: string;
  locationId: string;
  stockQuantity: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
};

export type UpdateInventoryInput = {
  locationId?: string;
  stockQuantity?: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
};

export class InventoryService {
  public constructor(
    private readonly inventoryRepository: IInventoryRepository,
    private readonly wineRepository: IWineRepository
  ) { }

  public async getInventory() {
    return this.inventoryRepository.findMany();
  }

  public async getInventoryById(id: string) {
    const inventory = await this.inventoryRepository.findById(id);

    if (!inventory) {
      throw new AppError("Inventory item not found", 404);
    }

    return inventory;
  }

  public async createInventory(input: CreateInventoryInput) {
    return this.inventoryRepository.create({
      wineVariation: { connect: { id: input.wineVariationId } },
      locationId: input.locationId,
      stockQuantity: input.stockQuantity,
      isAvailable: input.isAvailable ?? true,
      isFeatured: input.isFeatured ?? false
    });
  }

  public async updateInventory(id: string, input: UpdateInventoryInput) {
    await this.getInventoryById(id);

    return this.inventoryRepository.update(id, input);
  }
}
