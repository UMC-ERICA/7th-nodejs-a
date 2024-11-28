-- CreateTable
CREATE TABLE `Account` (
    `xid` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(10) NOT NULL,
    `create_at` DATE NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `birth` DATE NOT NULL,
    `address` VARCHAR(45) NULL,
    `state` ENUM('accession', 'secession') NOT NULL,
    `delete_at` DATE NULL,
    `point` INTEGER NULL,
    `food` VARCHAR(45) NULL,

    PRIMARY KEY (`xid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `phone` VARCHAR(15) NULL,
    `address` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `content` TEXT NOT NULL,
    `point` INTEGER NOT NULL,
    `restaurant_id` INTEGER NULL,
    `deadline` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_xid` INTEGER NOT NULL,
    `restaurant_id` INTEGER NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `body` TEXT NULL,
    `rating` DOUBLE NOT NULL,
    `create_at` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MissionList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_xid` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `state` ENUM('clear', 'trying', 'failed') NOT NULL,
    `create_at` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Point_List` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_xid` INTEGER NOT NULL,
    `created_at` DATE NOT NULL,
    `change_point` INTEGER NOT NULL,
    `source` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_xid` INTEGER NOT NULL,
    `review_id` INTEGER NOT NULL,
    `body` TEXT NOT NULL,
    `comment_date` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL,
    `body` TEXT NOT NULL,
    `create_at` DATE NOT NULL,
    `image` VARCHAR(45) NULL,
    `state` ENUM('answered', 'yet') NOT NULL,
    `account_xid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `review_id` INTEGER NOT NULL,
    `image` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialLogin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_xid` INTEGER NOT NULL,
    `platform` ENUM('google', 'kakao', 'naver', 'apple') NOT NULL,
    `created_at` TIME NOT NULL,
    `access_token` VARCHAR(500) NOT NULL,
    `refresh_token` VARCHAR(500) NOT NULL,
    `social_user_id` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restarant_Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(45) NOT NULL,
    `restaurant_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_account_xid_fkey` FOREIGN KEY (`account_xid`) REFERENCES `Account`(`xid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MissionList` ADD CONSTRAINT `MissionList_account_xid_fkey` FOREIGN KEY (`account_xid`) REFERENCES `Account`(`xid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MissionList` ADD CONSTRAINT `MissionList_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Point_List` ADD CONSTRAINT `Point_List_account_xid_fkey` FOREIGN KEY (`account_xid`) REFERENCES `Account`(`xid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_account_xid_fkey` FOREIGN KEY (`account_xid`) REFERENCES `Account`(`xid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inquery` ADD CONSTRAINT `Inquery_account_xid_fkey` FOREIGN KEY (`account_xid`) REFERENCES `Account`(`xid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review_image` ADD CONSTRAINT `Review_image_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialLogin` ADD CONSTRAINT `SocialLogin_account_xid_fkey` FOREIGN KEY (`account_xid`) REFERENCES `Account`(`xid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restarant_Image` ADD CONSTRAINT `Restarant_Image_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
