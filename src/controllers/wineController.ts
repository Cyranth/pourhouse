import { Request, Response } from "express";
import {
  createWine,
  getWineById,
  getWineRatings,
  getWines,
  searchWines
} from "../services/wineService";

export async function listWines(_req: Request, res: Response) {
  const wines = await getWines();
  res.status(200).json(wines);
}

export async function getWine(req: Request, res: Response) {
  const wineId = req.params.id as string;
  const wine = await getWineById(wineId);
  res.status(200).json(wine);
}

export async function addWine(req: Request, res: Response) {
  const wine = await createWine(req.body);
  res.status(201).json(wine);
}

export async function searchWine(req: Request, res: Response) {
  const wines = await searchWines(req.query.q as string);
  res.status(200).json(wines);
}

export async function listWineRatings(req: Request, res: Response) {
  const wineId = req.params.id as string;
  const ratings = await getWineRatings(wineId);
  res.status(200).json(ratings);
}
