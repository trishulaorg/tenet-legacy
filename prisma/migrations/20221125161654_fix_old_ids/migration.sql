/*
  Warnings:

  - The primary key for the `Persona` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Bot` MODIFY `personaId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `FollowingBoard` MODIFY `personaId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `NotificationEvent` MODIFY `senderId` VARCHAR(191) NOT NULL,
    MODIFY `receiverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Persona` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PersonaRelation` MODIFY `srcPersonaId` VARCHAR(191) NOT NULL,
    MODIFY `destPersonaId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `personaId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Reply` MODIFY `personaId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ThirdPartyAPIKey` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Thread` MODIFY `personaId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `VoteOnComment` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `VoteOnPost` MODIFY `createdById` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_BoardRoleToPersona` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_BoardToPersona` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_PersonaToPostRole` MODIFY `A` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_PersonaToSystemAdministratorRole` MODIFY `A` VARCHAR(191) NOT NULL;
