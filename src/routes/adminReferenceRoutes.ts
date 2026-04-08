import { Router } from "express";
import { adminAuthMiddleware } from "@/middleware/adminAuthMiddleware";
import { listAdminWineOptions } from "@/controllers/adminReferenceController";

const router = Router();

router.use(adminAuthMiddleware);
router.get("/wine-options", listAdminWineOptions);

export default router;
