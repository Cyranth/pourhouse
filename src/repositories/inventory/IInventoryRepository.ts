import type { Prisma } from "@prisma/client";

export type InventoryRecord = {
  id: string;
} & Record<string, unknown>;

export interface IInventoryRepository {
  findMany(): Promise<InventoryRecord[]>;
  findById(id: string): Promise<InventoryRecord | null>;
  create(input: Prisma.InventoryCreateInput): Promise<InventoryRecord>;
  update(id: string, input: Prisma.InventoryUpdateInput): Promise<InventoryRecord>;
}
