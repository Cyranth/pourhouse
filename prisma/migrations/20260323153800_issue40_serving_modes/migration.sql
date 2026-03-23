-- CreateEnum
CREATE TYPE "public"."ServingMode" AS ENUM ('BOTTLE_750ML', 'GLASS_5OZ', 'GLASS_9OZ', 'FLIGHT_2OZ', 'UNKNOWN');

-- CreateTable
CREATE TABLE "public"."WineVariationServingMode" (
    "id" TEXT NOT NULL,
    "wineVariationId" TEXT NOT NULL,
    "servingMode" "public"."ServingMode" NOT NULL DEFAULT 'UNKNOWN',
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WineVariationServingMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SquareServingModeOverride" (
    "id" TEXT NOT NULL,
    "squareVariationId" TEXT NOT NULL,
    "servingMode" "public"."ServingMode" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SquareServingModeOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WineVariationServingMode_wineVariationId_key" ON "public"."WineVariationServingMode"("wineVariationId");

-- CreateIndex
CREATE INDEX "WineVariationServingMode_servingMode_isAvailable_idx" ON "public"."WineVariationServingMode"("servingMode", "isAvailable");

-- CreateIndex
CREATE UNIQUE INDEX "SquareServingModeOverride_squareVariationId_key" ON "public"."SquareServingModeOverride"("squareVariationId");

-- AddForeignKey
ALTER TABLE "public"."WineVariationServingMode" ADD CONSTRAINT "WineVariationServingMode_wineVariationId_fkey" FOREIGN KEY ("wineVariationId") REFERENCES "public"."WineVariation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

