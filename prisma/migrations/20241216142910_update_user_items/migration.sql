-- DropForeignKey
ALTER TABLE `Items` DROP FOREIGN KEY `Items_createdBy_fkey`;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
