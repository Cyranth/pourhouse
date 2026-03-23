-- DropForeignKey
ALTER TABLE "public"."Inventory" DROP CONSTRAINT "Inventory_wineVariationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WineVariation" DROP CONSTRAINT "WineVariation_wineId_fkey";

-- AlterTable
ALTER TABLE "public"."Inventory" DROP COLUMN "stockQuantity",
DROP COLUMN "wineVariationId",
ADD COLUMN     "sealedBottleCount" INTEGER NOT NULL,
ADD COLUMN     "wineId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."SquareCatalogItem" (
    "id" TEXT NOT NULL,
    "squareItemId" TEXT NOT NULL,
    "wineId" TEXT,
    "rawPayload" JSONB NOT NULL,
    "extractedData" JSONB NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL,
    "syncFailedAt" TIMESTAMP(3),
    "syncError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SquareCatalogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SquareCatalogVariation" (
    "id" TEXT NOT NULL,
    "squareVariationId" TEXT NOT NULL,
    "squareCatalogItemId" TEXT NOT NULL,
    "wineVariationId" TEXT,
    "rawPayload" JSONB NOT NULL,
    "extractedData" JSONB NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL,
    "syncFailedAt" TIMESTAMP(3),
    "syncError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SquareCatalogVariation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SquareCatalogItem_squareItemId_key" ON "public"."SquareCatalogItem"("squareItemId");

-- CreateIndex
CREATE UNIQUE INDEX "SquareCatalogItem_wineId_key" ON "public"."SquareCatalogItem"("wineId");

-- CreateIndex
CREATE INDEX "SquareCatalogItem_wineId_idx" ON "public"."SquareCatalogItem"("wineId");

-- CreateIndex
CREATE UNIQUE INDEX "SquareCatalogVariation_squareVariationId_key" ON "public"."SquareCatalogVariation"("squareVariationId");

-- CreateIndex
CREATE UNIQUE INDEX "SquareCatalogVariation_wineVariationId_key" ON "public"."SquareCatalogVariation"("wineVariationId");

-- CreateIndex
CREATE INDEX "SquareCatalogVariation_squareCatalogItemId_idx" ON "public"."SquareCatalogVariation"("squareCatalogItemId");

-- CreateIndex
CREATE INDEX "SquareCatalogVariation_wineVariationId_idx" ON "public"."SquareCatalogVariation"("wineVariationId");

-- CreateIndex
CREATE INDEX "Inventory_wineId_idx" ON "public"."Inventory"("wineId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_wineId_locationId_key" ON "public"."Inventory"("wineId", "locationId");

-- AddForeignKey
ALTER TABLE "public"."WineVariation" ADD CONSTRAINT "WineVariation_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "public"."Wine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SquareCatalogItem" ADD CONSTRAINT "SquareCatalogItem_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "public"."Wine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SquareCatalogVariation" ADD CONSTRAINT "SquareCatalogVariation_squareCatalogItemId_fkey" FOREIGN KEY ("squareCatalogItemId") REFERENCES "public"."SquareCatalogItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SquareCatalogVariation" ADD CONSTRAINT "SquareCatalogVariation_wineVariationId_fkey" FOREIGN KEY ("wineVariationId") REFERENCES "public"."WineVariation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "public"."Wine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

