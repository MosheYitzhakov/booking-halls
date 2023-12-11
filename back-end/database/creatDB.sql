CREATE SCHEMA `halls` ;
CREATE TABLE `orders`(
    `id_order` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_hall` BIGINT NOT NULL,
    `num_guests` BIGINT NOT NULL,
    `num_m_adults` BIGINT NOT NULL,
    `num_m_children` BIGINT NOT NULL,
    `num_m_bar` BIGINT NOT NULL,
    `type` CHAR(255) NOT NULL,
    `total_payment` BIGINT NOT NULL,
    PRIMARY KEY (`id_order`)
);

CREATE TABLE `events schedule`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_hall` BIGINT NOT NULL,
    `hebrew_date` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
     PRIMARY KEY (`id`)
);

CREATE TABLE `users`(
    `id_user` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `degree` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` BIGINT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` BIGINT NOT NULL,
    `side` CHAR(255) NOT NULL,
     PRIMARY KEY (`id_user`),
     UNIQUE(`password`)
);
CREATE TABLE `invoices`(
    `id_invoice` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_user` VARCHAR(255) NOT NULL,
    `payment` BIGINT NOT NULL,
    `date` BIGINT NOT NULL,
     PRIMARY KEY (`id_invoice`)
);
CREATE TABLE `halls`(
    `id_hall` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_hall` VARCHAR(255) NOT NULL,
    `base price` BIGINT NOT NULL,
    `min_guests` BIGINT NOT NULL,
    `max_guests` BIGINT NOT NULL,
    `min_meals` BIGINT NOT NULL,
    `p_b_adults` BIGINT NOT NULL,
    `p_b_children` BIGINT NOT NULL,
    `p_b_bar` BIGINT NOT NULL,
    `p_p_adults` BIGINT NOT NULL,
    `p_p_children` BIGINT NOT NULL,
    `p_p_bar` BIGINT NOT NULL,
    `down_payment` BIGINT NOT NULL,
    PRIMARY KEY (`id_hall`)
);
CREATE TABLE `images`(
    `id_image` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_hall` BIGINT NOT NULL,
    PRIMARY KEY(`id_image`)
);
CREATE TABLE `customers_orders`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_user` BIGINT NOT NULL,
    `id_order` BIGINT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `managers_halls`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_user` BIGINT NOT NULL,
    `id_hall` BIGINT NOT NULL,
    PRIMARY KEY (`id`)
);
ALTER TABLE `halls`.`users` 
CHANGE COLUMN `side` `side` CHAR(255) NULL DEFAULT NULL ;

INSERT INTO `halls`.`users`
 (`id_user`, `degree`, `name`, `phone`, `email`, `password`) 
 VALUES ('1', 'manager', 'menashe', '0505021045', 'menashe@hall.com', '123123');
