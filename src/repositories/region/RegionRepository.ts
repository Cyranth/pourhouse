import type { PrismaClient } from "@prisma/client";
import type { IRegionRepository } from "@/repositories/region/IRegionRepository";

export class RegionRepository implements IRegionRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async findMany() {
    return this.prisma.region.findMany({
      orderBy: { name: "asc" }
    });
  }

  public async findById(id: string) {
    return this.prisma.region.findUnique({ where: { id } });
  }
}
