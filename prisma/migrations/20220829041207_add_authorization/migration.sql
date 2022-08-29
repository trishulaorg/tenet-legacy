/*
  Warnings:

  - You are about to drop the `VoteOnComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VoteOnPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `defaultBoardRoleId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultPostRoleId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultReplyRoleId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultThreadRoleId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultPostRoleId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultReplyRoleId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultThreadRoleId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `VoteOnComment` DROP FOREIGN KEY `VoteOnComment_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `VoteOnPost` DROP FOREIGN KEY `VoteOnPost_createdById_fkey`;

-- AlterTable
ALTER TABLE `Board` ADD COLUMN `defaultBoardRoleId` INTEGER NOT NULL,
    ADD COLUMN `defaultPostRoleId` INTEGER NOT NULL,
    ADD COLUMN `defaultReplyRoleId` INTEGER NOT NULL,
    ADD COLUMN `defaultThreadRoleId` INTEGER NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `defaultPostRoleId` INTEGER NOT NULL,
    ADD COLUMN `defaultReplyRoleId` INTEGER NOT NULL,
    ADD COLUMN `defaultThreadRoleId` INTEGER NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Reply` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Thread` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `VoteOnComment`;

-- DropTable
DROP TABLE `VoteOnPost`;

-- CreateTable
CREATE TABLE `AllowedWritingRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create` BOOLEAN NOT NULL DEFAULT false,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `update` BOOLEAN NOT NULL DEFAULT false,
    `delete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Posts_Vote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments_Vote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemAdministratorRole` (
    `id` CHAR(26) NOT NULL,
    `allowAll` BOOLEAN NOT NULL DEFAULT false,
    `roleManager` BOOLEAN NOT NULL DEFAULT false,
    `boardRoleId` INTEGER NOT NULL,
    `postRoleId` INTEGER NOT NULL,
    `threadRoleId` INTEGER NOT NULL,
    `replyRoleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BoardRole` (
    `id` CHAR(26) NOT NULL,
    `allowAll` BOOLEAN NOT NULL DEFAULT false,
    `roleManager` BOOLEAN NOT NULL DEFAULT false,
    `boardRoleId` INTEGER NOT NULL,
    `postRoleId` INTEGER NOT NULL,
    `threadRoleId` INTEGER NOT NULL,
    `replyRoleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostRole` (
    `id` CHAR(26) NOT NULL,
    `allowAll` BOOLEAN NOT NULL DEFAULT false,
    `roleManager` BOOLEAN NOT NULL DEFAULT false,
    `postRoleId` INTEGER NOT NULL,
    `threadRoleId` INTEGER NOT NULL,
    `replyRoleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PersonaToSystemAdministratorRole` (
    `A` INTEGER NOT NULL,
    `B` CHAR(26) NOT NULL,

    UNIQUE INDEX `_PersonaToSystemAdministratorRole_AB_unique`(`A`, `B`),
    INDEX `_PersonaToSystemAdministratorRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PersonaToPostRole` (
    `A` INTEGER NOT NULL,
    `B` CHAR(26) NOT NULL,

    UNIQUE INDEX `_PersonaToPostRole_AB_unique`(`A`, `B`),
    INDEX `_PersonaToPostRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BoardToBoardRole` (
    `A` CHAR(26) NOT NULL,
    `B` CHAR(26) NOT NULL,

    UNIQUE INDEX `_BoardToBoardRole_AB_unique`(`A`, `B`),
    INDEX `_BoardToBoardRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PostToPostRole` (
    `A` CHAR(26) NOT NULL,
    `B` CHAR(26) NOT NULL,

    UNIQUE INDEX `_PostToPostRole_AB_unique`(`A`, `B`),
    INDEX `_PostToPostRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BoardRoleToPersona` (
    `A` CHAR(26) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BoardRoleToPersona_AB_unique`(`A`, `B`),
    INDEX `_BoardRoleToPersona_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Posts_Vote` ADD CONSTRAINT `Posts_Vote_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments_Vote` ADD CONSTRAINT `Comments_Vote_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_defaultBoardRoleId_fkey` FOREIGN KEY (`defaultBoardRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_defaultPostRoleId_fkey` FOREIGN KEY (`defaultPostRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_defaultThreadRoleId_fkey` FOREIGN KEY (`defaultThreadRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_defaultReplyRoleId_fkey` FOREIGN KEY (`defaultReplyRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_defaultPostRoleId_fkey` FOREIGN KEY (`defaultPostRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_defaultThreadRoleId_fkey` FOREIGN KEY (`defaultThreadRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_defaultReplyRoleId_fkey` FOREIGN KEY (`defaultReplyRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SystemAdministratorRole` ADD CONSTRAINT `SystemAdministratorRole_boardRoleId_fkey` FOREIGN KEY (`boardRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SystemAdministratorRole` ADD CONSTRAINT `SystemAdministratorRole_postRoleId_fkey` FOREIGN KEY (`postRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SystemAdministratorRole` ADD CONSTRAINT `SystemAdministratorRole_threadRoleId_fkey` FOREIGN KEY (`threadRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SystemAdministratorRole` ADD CONSTRAINT `SystemAdministratorRole_replyRoleId_fkey` FOREIGN KEY (`replyRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardRole` ADD CONSTRAINT `BoardRole_boardRoleId_fkey` FOREIGN KEY (`boardRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardRole` ADD CONSTRAINT `BoardRole_postRoleId_fkey` FOREIGN KEY (`postRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardRole` ADD CONSTRAINT `BoardRole_threadRoleId_fkey` FOREIGN KEY (`threadRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardRole` ADD CONSTRAINT `BoardRole_replyRoleId_fkey` FOREIGN KEY (`replyRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostRole` ADD CONSTRAINT `PostRole_postRoleId_fkey` FOREIGN KEY (`postRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostRole` ADD CONSTRAINT `PostRole_threadRoleId_fkey` FOREIGN KEY (`threadRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostRole` ADD CONSTRAINT `PostRole_replyRoleId_fkey` FOREIGN KEY (`replyRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PersonaToSystemAdministratorRole` ADD CONSTRAINT `_PersonaToSystemAdministratorRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PersonaToSystemAdministratorRole` ADD CONSTRAINT `_PersonaToSystemAdministratorRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `SystemAdministratorRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PersonaToPostRole` ADD CONSTRAINT `_PersonaToPostRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PersonaToPostRole` ADD CONSTRAINT `_PersonaToPostRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `PostRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BoardToBoardRole` ADD CONSTRAINT `_BoardToBoardRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Board`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BoardToBoardRole` ADD CONSTRAINT `_BoardToBoardRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `BoardRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToPostRole` ADD CONSTRAINT `_PostToPostRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToPostRole` ADD CONSTRAINT `_PostToPostRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `PostRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BoardRoleToPersona` ADD CONSTRAINT `_BoardRoleToPersona_A_fkey` FOREIGN KEY (`A`) REFERENCES `BoardRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BoardRoleToPersona` ADD CONSTRAINT `_BoardRoleToPersona_B_fkey` FOREIGN KEY (`B`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
