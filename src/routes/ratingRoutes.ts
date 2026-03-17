import { Router } from "express";
import { addRating } from "../controllers/ratingController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { createRatingSchema } from "../models/validation";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", authMiddleware, validateRequest(createRatingSchema), asyncHandler(addRating));

export default router;
