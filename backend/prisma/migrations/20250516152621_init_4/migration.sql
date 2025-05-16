/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ParkingSlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ParkingSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingSlot" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSlot_name_key" ON "ParkingSlot"("name");
