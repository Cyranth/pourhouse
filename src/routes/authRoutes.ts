import { Router } from "express";
import { login, register } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../models/validation";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", validateRequest(registerSchema), asyncHandler(register));
router.post("/login", validateRequest(loginSchema), asyncHandler(login));

export default router;
