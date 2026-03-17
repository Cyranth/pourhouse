import { Router } from "express";
import {
  addWine,
  getWine,
  listWineRatings,
  listWines,
  searchWine
} from "../controllers/wineController";
import { validateRequest } from "../middleware/validateRequest";
import { createWineSchema, searchWineSchema } from "../models/validation";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(listWines));
router.get("/search", validateRequest(searchWineSchema, "query"), asyncHandler(searchWine));
router.get("/:id", asyncHandler(getWine));
router.post("/", validateRequest(createWineSchema), asyncHandler(addWine));
router.get("/:id/ratings", asyncHandler(listWineRatings));

export default router;
