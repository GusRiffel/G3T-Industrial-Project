-- CreateTable
CREATE TABLE `zones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(255) NOT NULL,
    `land_zone` VARCHAR(255) NULL,
    `mobile_zone` VARCHAR(255) NULL,
    `land_tariff` VARCHAR(255) NULL,
    `mobile_tariff` VARCHAR(255) NULL,
    `mobile` BOOLEAN NULL,
    `landline` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
