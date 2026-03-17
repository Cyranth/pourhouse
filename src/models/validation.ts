import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const createWineSchema = z.object({
  name: z.string().min(1),
  vintage: z.number().int().min(1900).max(2100),
  wineryId: z.string().uuid(),
  regionId: z.string().uuid(),
  country: z.string().min(1),
  grapeVarieties: z.array(z.string().min(1)).min(1),
  alcoholPercent: z.number().min(0).max(100),
  description: z.string().min(1),
  imageUrl: z.string().url()
});

export const searchWineSchema = z.object({
  q: z.string().min(1)
});

export const createInventorySchema = z.object({
  wineId: z.string().uuid(),
  locationId: z.string().min(1),
  priceGlass: z.number().positive(),
  priceBottle: z.number().positive(),
  stockQuantity: z.number().int().min(0),
  isAvailable: z.boolean().optional(),
  isFeatured: z.boolean().optional()
});

export const updateInventorySchema = z.object({
  locationId: z.string().min(1).optional(),
  priceGlass: z.number().positive().optional(),
  priceBottle: z.number().positive().optional(),
  stockQuantity: z.number().int().min(0).optional(),
  isAvailable: z.boolean().optional(),
  isFeatured: z.boolean().optional()
});

export const createRatingSchema = z.object({
  wineId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  notes: z.string().min(1)
});
