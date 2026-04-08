import { prisma } from "@/config/prisma";
import { RegionRepository } from "@/repositories/region/RegionRepository";
import { WineryRepository } from "@/repositories/winery/WineryRepository";
import { AdminReferenceService } from "@/services/adminReferenceService";

const regionRepository = new RegionRepository(prisma);
const wineryRepository = new WineryRepository(prisma);

export const adminReferenceService = new AdminReferenceService(regionRepository, wineryRepository);
