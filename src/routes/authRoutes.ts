import { Router } from "express";
import { authController } from "@/container";
import { validateRequest } from "@/middleware/validateRequest";
import { googleAuthSchema } from "@/models/validation";
import { asyncHandler } from "@/utils/asyncHandler";

const router = Router();

router.post("/google", validateRequest(googleAuthSchema), asyncHandler(authController.authenticateWithGoogle));

export default router;
