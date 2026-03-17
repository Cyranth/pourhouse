import { Request, Response } from "express";
import {
  createInventory,
  getInventory,
  getInventoryById,
  updateInventory
} from "../services/inventoryService";

export async function listInventory(_req: Request, res: Response) {
  const inventory = await getInventory();
  res.status(200).json(inventory);
}

export async function getInventoryItem(req: Request, res: Response) {
  const inventoryId = req.params.id as string;
  const item = await getInventoryById(inventoryId);
  res.status(200).json(item);
}

export async function addInventory(req: Request, res: Response) {
  const item = await createInventory(req.body);
  res.status(201).json(item);
}

export async function patchInventory(req: Request, res: Response) {
  const inventoryId = req.params.id as string;
  const item = await updateInventory(inventoryId, req.body);
  res.status(200).json(item);
}
