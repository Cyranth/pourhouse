import { Request, Response } from "express";
import { createRating } from "../services/ratingService";
import { AppError } from "../utils/appError";

export async function addRating(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const rating = await createRating({
    userId: req.user.id,
    wineId: req.body.wineId,
    rating: req.body.rating,
    notes: req.body.notes
  });

  res.status(201).json(rating);
}
