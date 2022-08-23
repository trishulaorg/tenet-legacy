/*
  Warnings:

  - You are about to alter the column `title` on the `Board` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.
  - You are about to alter the column `screenName` on the `Persona` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `Board` MODIFY `title` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Persona` MODIFY `screenName` VARCHAR(30) NOT NULL;
