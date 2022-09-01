/*
  Warnings:

  - You are about to drop the `Comments_Vote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Posts_Vote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FollowingBoards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Board` DROP FOREIGN KEY `Board_defaultBoardRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Board` DROP FOREIGN KEY `Board_defaultPostRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Board` DROP FOREIGN KEY `Board_defaultReplyRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Board` DROP FOREIGN KEY `Board_defaultThreadRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `BoardRole` DROP FOREIGN KEY `BoardRole_boardRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `BoardRole` DROP FOREIGN KEY `BoardRole_postRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `BoardRole` DROP FOREIGN KEY `BoardRole_replyRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `BoardRole` DROP FOREIGN KEY `BoardRole_threadRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments_Vote` DROP FOREIGN KEY `Comments_Vote_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Persona` DROP FOREIGN KEY `Persona_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PersonaRelation` DROP FOREIGN KEY `PersonaRelation_destPersonaId_fkey`;

-- DropForeignKey
ALTER TABLE `PersonaRelation` DROP FOREIGN KEY `PersonaRelation_srcPersonaId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_defaultPostRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_defaultReplyRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_defaultThreadRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_personaId_fkey`;

-- DropForeignKey
ALTER TABLE `PostRole` DROP FOREIGN KEY `PostRole_postRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `PostRole` DROP FOREIGN KEY `PostRole_replyRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `PostRole` DROP FOREIGN KEY `PostRole_threadRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Posts_Vote` DROP FOREIGN KEY `Posts_Vote_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_personaId_fkey`;

-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_threadId_fkey`;

-- DropForeignKey
ALTER TABLE `SystemAdministratorRole` DROP FOREIGN KEY `SystemAdministratorRole_boardRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `SystemAdministratorRole` DROP FOREIGN KEY `SystemAdministratorRole_postRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `SystemAdministratorRole` DROP FOREIGN KEY `SystemAdministratorRole_replyRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `SystemAdministratorRole` DROP FOREIGN KEY `SystemAdministratorRole_threadRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Thread` DROP FOREIGN KEY `Thread_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `Thread` DROP FOREIGN KEY `Thread_personaId_fkey`;

-- DropForeignKey
ALTER TABLE `Thread` DROP FOREIGN KEY `Thread_postId_fkey`;

-- DropForeignKey
ALTER TABLE `_BoardRoleToPersona` DROP FOREIGN KEY `_BoardRoleToPersona_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BoardRoleToPersona` DROP FOREIGN KEY `_BoardRoleToPersona_B_fkey`;

-- DropForeignKey
ALTER TABLE `_BoardToBoardRole` DROP FOREIGN KEY `_BoardToBoardRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BoardToBoardRole` DROP FOREIGN KEY `_BoardToBoardRole_B_fkey`;

-- DropForeignKey
ALTER TABLE `_BoardToPersona` DROP FOREIGN KEY `_BoardToPersona_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BoardToPersona` DROP FOREIGN KEY `_BoardToPersona_B_fkey`;

-- DropForeignKey
ALTER TABLE `_FollowingBoards` DROP FOREIGN KEY `_FollowingBoards_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FollowingBoards` DROP FOREIGN KEY `_FollowingBoards_B_fkey`;

-- DropForeignKey
ALTER TABLE `_PersonaToPostRole` DROP FOREIGN KEY `_PersonaToPostRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PersonaToPostRole` DROP FOREIGN KEY `_PersonaToPostRole_B_fkey`;

-- DropForeignKey
ALTER TABLE `_PersonaToSystemAdministratorRole` DROP FOREIGN KEY `_PersonaToSystemAdministratorRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PersonaToSystemAdministratorRole` DROP FOREIGN KEY `_PersonaToSystemAdministratorRole_B_fkey`;

-- DropForeignKey
ALTER TABLE `_PostToPostRole` DROP FOREIGN KEY `_PostToPostRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PostToPostRole` DROP FOREIGN KEY `_PostToPostRole_B_fkey`;

-- DropTable
DROP TABLE `Comments_Vote`;

-- DropTable
DROP TABLE `Posts_Vote`;

-- DropTable
DROP TABLE `_FollowingBoards`;

-- CreateTable
CREATE TABLE `VoteOnPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VoteOnComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FollowingBoard` (
    `id` CHAR(26) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `boardId` VARCHAR(191) NOT NULL,
    `personaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
