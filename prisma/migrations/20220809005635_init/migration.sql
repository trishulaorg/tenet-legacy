/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `Persona` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(25)`.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Thread` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Board` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(26) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Persona` MODIFY `name` VARCHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(26) NOT NULL,
    MODIFY `boardId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Reply` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(26) NOT NULL,
    MODIFY `threadId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Thread` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(26) NOT NULL,
    MODIFY `boardId` VARCHAR(191) NOT NULL,
    MODIFY `postId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_BoardToPersona` MODIFY `A` VARCHAR(26) NOT NULL;

-- AlterTable
ALTER TABLE `_FollowingBoards` MODIFY `A` VARCHAR(26) NOT NULL;

-- CreateTable
CREATE TABLE `PostAttachment` (
    `id` VARCHAR(26) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `src` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
