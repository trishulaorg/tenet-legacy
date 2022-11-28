-- CreateTable
CREATE TABLE `DirectMessage` (
    `id` CHAR(26) NOT NULL,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `encryptedContent` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonaProfile` (
    `id` CHAR(26) NOT NULL,
    `personaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bio` TEXT NOT NULL,
    `headerImage` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PersonaProfile_personaId_key`(`personaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
