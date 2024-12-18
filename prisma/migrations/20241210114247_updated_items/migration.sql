/*
  Warnings:

  - You are about to drop the column `qty_in` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `qty_out` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Users` table. All the data in the column will be lost.
  - Made the column `itemStatus` on table `Items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Inventory` DROP COLUMN `qty_in`,
    DROP COLUMN `qty_out`,
    ADD COLUMN `qtyIn` INTEGER NULL,
    ADD COLUMN `qtyOut` INTEGER NULL;

-- AlterTable
ALTER TABLE `Items` MODIFY `itemStatus` ENUM('Active', 'InActive', 'NotFound') NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `created_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
