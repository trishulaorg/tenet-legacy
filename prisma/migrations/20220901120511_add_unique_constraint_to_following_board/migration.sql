/*
  Warnings:

  - A unique constraint covering the columns `[boardId,personaId,deletedAt]` on the table `FollowingBoard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Board_defaultBoardRoleId_fkey` ON `Board`;

-- DropIndex
DROP INDEX `Board_defaultPostRoleId_fkey` ON `Board`;

-- DropIndex
DROP INDEX `Board_defaultReplyRoleId_fkey` ON `Board`;

-- DropIndex
DROP INDEX `Board_defaultThreadRoleId_fkey` ON `Board`;

-- DropIndex
DROP INDEX `BoardRole_boardRoleId_fkey` ON `BoardRole`;

-- DropIndex
DROP INDEX `BoardRole_postRoleId_fkey` ON `BoardRole`;

-- DropIndex
DROP INDEX `BoardRole_replyRoleId_fkey` ON `BoardRole`;

-- DropIndex
DROP INDEX `BoardRole_threadRoleId_fkey` ON `BoardRole`;

-- DropIndex
DROP INDEX `Persona_userId_fkey` ON `Persona`;

-- DropIndex
DROP INDEX `PersonaRelation_destPersonaId_fkey` ON `PersonaRelation`;

-- DropIndex
DROP INDEX `PersonaRelation_srcPersonaId_fkey` ON `PersonaRelation`;

-- DropIndex
DROP INDEX `Post_boardId_fkey` ON `Post`;

-- DropIndex
DROP INDEX `Post_defaultPostRoleId_fkey` ON `Post`;

-- DropIndex
DROP INDEX `Post_defaultReplyRoleId_fkey` ON `Post`;

-- DropIndex
DROP INDEX `Post_defaultThreadRoleId_fkey` ON `Post`;

-- DropIndex
DROP INDEX `Post_personaId_fkey` ON `Post`;

-- DropIndex
DROP INDEX `PostRole_postRoleId_fkey` ON `PostRole`;

-- DropIndex
DROP INDEX `PostRole_replyRoleId_fkey` ON `PostRole`;

-- DropIndex
DROP INDEX `PostRole_threadRoleId_fkey` ON `PostRole`;

-- DropIndex
DROP INDEX `Reply_personaId_fkey` ON `Reply`;

-- DropIndex
DROP INDEX `Reply_threadId_fkey` ON `Reply`;

-- DropIndex
DROP INDEX `SystemAdministratorRole_boardRoleId_fkey` ON `SystemAdministratorRole`;

-- DropIndex
DROP INDEX `SystemAdministratorRole_postRoleId_fkey` ON `SystemAdministratorRole`;

-- DropIndex
DROP INDEX `SystemAdministratorRole_replyRoleId_fkey` ON `SystemAdministratorRole`;

-- DropIndex
DROP INDEX `SystemAdministratorRole_threadRoleId_fkey` ON `SystemAdministratorRole`;

-- DropIndex
DROP INDEX `Thread_boardId_fkey` ON `Thread`;

-- DropIndex
DROP INDEX `Thread_personaId_fkey` ON `Thread`;

-- DropIndex
DROP INDEX `Thread_postId_fkey` ON `Thread`;

-- AlterTable
ALTER TABLE `FollowingBoard` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `FollowingBoard_boardId_personaId_deletedAt_key` ON `FollowingBoard`(`boardId`, `personaId`, `deletedAt`);
