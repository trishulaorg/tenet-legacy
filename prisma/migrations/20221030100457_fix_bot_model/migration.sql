-- CreateTable
CREATE TABLE `Bot` (
    `id` CHAR(26) NOT NULL,
    `personaId` INTEGER NOT NULL,
    `thirdPartyAPIKeyId` CHAR(26) NOT NULL,

    UNIQUE INDEX `Bot_personaId_key`(`personaId`),
    UNIQUE INDEX `Bot_thirdPartyAPIKeyId_key`(`thirdPartyAPIKeyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
