-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrer_name` VARCHAR(191) NOT NULL,
    `referrer_email` VARCHAR(191) NOT NULL,
    `referrer_code` VARCHAR(191) NOT NULL,
    `referee_name` VARCHAR(191) NOT NULL,
    `referee_email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
