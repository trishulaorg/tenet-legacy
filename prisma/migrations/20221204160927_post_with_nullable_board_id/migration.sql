/*
  Warnings:

  - Added the required column `iv` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DirectMessage` ADD COLUMN `iv` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `boardId` VARCHAR(191) NULL;
