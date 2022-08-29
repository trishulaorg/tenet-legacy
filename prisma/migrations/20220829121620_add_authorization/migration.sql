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
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(25) NOT NULL,
    `screenName` VARCHAR(30) NOT NULL,
    `iconUrl` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Persona_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonaRelation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `srcPersonaId` INTEGER NOT NULL,
    `destPersonaId` INTEGER NOT NULL,

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
CREATE TABLE `Board` (
    `id` CHAR(26) NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `description` VARCHAR(2000) NOT NULL,
    `defaultBoardRoleId` INTEGER NOT NULL,
    `defaultPostRoleId` INTEGER NOT NULL,
    `defaultThreadRoleId` INTEGER NOT NULL,
    `defaultReplyRoleId` INTEGER NOT NULL,

    UNIQUE INDEX `Board_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` CHAR(26) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `title` VARCHAR(50) NOT NULL,
    `contentType` ENUM('TEXT', 'LINK', 'IMAGE', 'VIDEO', 'EMOJI') NOT NULL,
    `content` VARCHAR(2000) NOT NULL,
    `boardId` VARCHAR(191) NOT NULL,
    `personaId` INTEGER NOT NULL,
    `defaultPostRoleId` INTEGER NOT NULL,
    `defaultThreadRoleId` INTEGER NOT NULL,
    `defaultReplyRoleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Thread` (
    `id` CHAR(26) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `content` VARCHAR(500) NOT NULL,
    `contentType` ENUM('TEXT', 'LINK', 'IMAGE', 'VIDEO', 'EMOJI') NOT NULL,
    `boardId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `personaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reply` (
    `id` CHAR(26) NOT NULL,
    `contentType` ENUM('TEXT', 'LINK', 'IMAGE', 'VIDEO', 'EMOJI') NOT NULL,
    `content` VARCHAR(500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `threadId` VARCHAR(191) NOT NULL,
    `personaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadedImage` (
    `id` CHAR(26) NOT NULL,
    `parentId` CHAR(26) NOT NULL,
    `fileUrl` TEXT NOT NULL,

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
CREATE TABLE `_BoardToPersona` (
    `A` CHAR(26) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BoardToPersona_AB_unique`(`A`, `B`),
    INDEX `_BoardToPersona_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FollowingBoards` (
    `A` CHAR(26) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FollowingBoards_AB_unique`(`A`, `B`),
    INDEX `_FollowingBoards_B_index`(`B`)
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
ALTER TABLE `Persona` ADD CONSTRAINT `Persona_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaRelation` ADD CONSTRAINT `PersonaRelation_srcPersonaId_fkey` FOREIGN KEY (`srcPersonaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaRelation` ADD CONSTRAINT `PersonaRelation_destPersonaId_fkey` FOREIGN KEY (`destPersonaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Post` ADD CONSTRAINT `Post_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_defaultPostRoleId_fkey` FOREIGN KEY (`defaultPostRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_defaultThreadRoleId_fkey` FOREIGN KEY (`defaultThreadRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_defaultReplyRoleId_fkey` FOREIGN KEY (`defaultReplyRoleId`) REFERENCES `AllowedWritingRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_threadId_fkey` FOREIGN KEY (`threadId`) REFERENCES `Thread`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `_BoardToPersona` ADD CONSTRAINT `_BoardToPersona_A_fkey` FOREIGN KEY (`A`) REFERENCES `Board`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BoardToPersona` ADD CONSTRAINT `_BoardToPersona_B_fkey` FOREIGN KEY (`B`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FollowingBoards` ADD CONSTRAINT `_FollowingBoards_A_fkey` FOREIGN KEY (`A`) REFERENCES `Board`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FollowingBoards` ADD CONSTRAINT `_FollowingBoards_B_fkey` FOREIGN KEY (`B`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
