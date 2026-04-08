import type { Request, Response } from "express";
import { adminReferenceService } from "@/controllers/_adminReferenceControllerDeps";

export const listAdminWineOptions = async (_req: Request, res: Response) => {
  try {
    const [regions, wineries] = await Promise.all([
      adminReferenceService.listRegions(),
      adminReferenceService.listWineries()
    ]);

    res.json({ regions, wineries });
  } catch (err) {
    res.status(500).json({
      error: "Failed to load admin wine options",
      details: err instanceof Error ? err.message : err
    });
  }
};
