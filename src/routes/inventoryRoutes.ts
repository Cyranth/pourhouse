import { Router } from "express";
import {
  addInventory,
  getInventoryItem,
  listInventory,
  patchInventory
} from "../controllers/inventoryController";
import { validateRequest } from "../middleware/validateRequest";
import { createInventorySchema, updateInventorySchema } from "../models/validation";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(listInventory));
router.get("/:id", asyncHandler(getInventoryItem));
router.post("/", validateRequest(createInventorySchema), asyncHandler(addInventory));
router.patch("/:id", validateRequest(updateInventorySchema), asyncHandler(patchInventory));

export default router;
