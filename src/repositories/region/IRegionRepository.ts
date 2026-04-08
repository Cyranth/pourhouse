import type { Region } from "@prisma/client";

export interface IRegionRepository {
  findMany(): Promise<Region[]>;
  findById(id: string): Promise<Region | null>;
}
