/*
  Warnings:

  - The values [bot,user] on the enum `ThirdPartyAPIKey_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `ThirdPartyAPIKey` MODIFY `type` ENUM('BOT', 'USER') NOT NULL;
