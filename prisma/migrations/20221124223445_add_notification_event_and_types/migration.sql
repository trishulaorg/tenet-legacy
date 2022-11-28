-- CreateTable
CREATE TABLE `NotificationEvent` (
    `id` CHAR(26) NOT NULL,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `type` ENUM('NEW_FOLLOWER', 'LIKE', 'COMMENT', 'DIRECT_MESSAGE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `readAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
