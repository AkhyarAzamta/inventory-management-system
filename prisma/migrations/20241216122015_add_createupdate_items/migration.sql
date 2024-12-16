/*
  Warnings:

  - Added the required column `updatedAt` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Items_createdBy_fkey` ON `Items`;

-- AlterTable
ALTER TABLE `Items` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
