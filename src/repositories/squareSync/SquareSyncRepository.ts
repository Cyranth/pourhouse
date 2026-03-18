import type { PrismaClient, Prisma } from "@prisma/client";
import type { ISquareSyncRepository, InventorySyncRow } from "@/repositories/squareSync/ISquareSyncRepository";

const SQUARE_REGION_ID = "00000000-0000-0000-0000-000000000001";
const SQUARE_WINERY_ID = "00000000-0000-0000-0000-000000000002";

export class SquareSyncRepository implements ISquareSyncRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async ensureSquareDefaults() {
    const region = await this.prisma.region.upsert({
      where: { id: SQUARE_REGION_ID },
      update: {},
      create: {
        id: SQUARE_REGION_ID,
        name: "Square Imports"
      }
    });

    const winery = await this.prisma.winery.upsert({
      where: { id: SQUARE_WINERY_ID },
      update: {},
      create: {
        id: SQUARE_WINERY_ID,
        name: "Square Imports",
        regionId: region.id,
        country: "Unknown",
        website: "https://squareup.com",
        description: "Auto-generated placeholder winery for Square catalog sync."
      }
    });

    return {
      regionId: region.id,
      wineryId: winery.id
    };
  }

  public async findWineBySquareItemId(squareItemId: string) {
    return this.prisma.wine.findUnique({
      where: { squareItemId }
    });
  }

  public async createWine(input: Prisma.WineUncheckedCreateInput) {
    return this.prisma.wine.create({ data: input });
  }

  public async updateWineBySquareItemId(squareItemId: string, input: Prisma.WineUncheckedUpdateInput) {
    return this.prisma.wine.update({
      where: { squareItemId },
      data: input
    });
  }

  public async replaceInventoryForWine(wineId: string, rows: InventorySyncRow[]) {
    return this.prisma.$transaction(async (tx) => {
      await tx.inventory.deleteMany({
        where: { wineId }
      });

      if (rows.length === 0) {
        return 0;
      }

      await tx.inventory.createMany({
        data: rows.map((row) => ({
          wineId,
          locationId: row.locationId,
          priceGlass: row.priceGlass,
          priceBottle: row.priceBottle,
          stockQuantity: row.stockQuantity,
          isAvailable: row.isAvailable,
          isFeatured: row.isFeatured
        }))
      });

      return rows.length;
    });
  }
}
