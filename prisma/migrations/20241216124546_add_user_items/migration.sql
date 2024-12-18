-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
