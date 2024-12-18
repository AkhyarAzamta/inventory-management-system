/*
  Warnings:

  - You are about to drop the column `userId` on the `Items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Items` DROP FOREIGN KEY `Items_userId_fkey`;

-- AlterTable
ALTER TABLE `Items` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
