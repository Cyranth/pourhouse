import type { Winery } from "@prisma/client";

export interface IWineryRepository {
  findMany(): Promise<Winery[]>;
  findById(id: string): Promise<Winery | null>;
}
