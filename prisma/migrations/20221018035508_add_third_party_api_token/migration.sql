-- CreateTable
CREATE TABLE `ThirdPartyAPIKey` (
    `id` CHAR(26) NOT NULL,
    `type` ENUM('bot', 'user') NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `revokedAt` DATETIME(3) NULL,

    UNIQUE INDEX `ThirdPartyAPIKey_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
