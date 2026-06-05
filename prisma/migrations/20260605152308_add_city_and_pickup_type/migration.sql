-- AlterTable
ALTER TABLE "FoodListing" ADD COLUMN     "pickupType" TEXT NOT NULL DEFAULT 'pickup';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT;
