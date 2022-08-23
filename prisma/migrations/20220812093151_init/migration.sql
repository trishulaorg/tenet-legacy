/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Thread` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Board` DROP PRIMARY KEY,
    MODIFY `id` CHAR(26) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    MODIFY `id` CHAR(26) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Reply` DROP PRIMARY KEY,
    MODIFY `id` CHAR(26) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Thread` DROP PRIMARY KEY,
    MODIFY `id` CHAR(26) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_BoardToPersona` MODIFY `A` CHAR(26) NOT NULL;

-- AlterTable
ALTER TABLE `_FollowingBoards` MODIFY `A` CHAR(26) NOT NULL;

-- CreateTable
CREATE TABLE `UploadedImage` (
    `id` CHAR(26) NOT NULL,
    `parentId` CHAR(26) NOT NULL,
    `fileUrl` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
