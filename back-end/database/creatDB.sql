DROP  SCHEMA if exists halls;
CREATE SCHEMA `halls` ;

CREATE TABLE `customers_orders` (
  `id_c` bigint NOT NULL,
  `id_order` bigint NOT NULL,
  `id_k` bigint NOT NULL,
  PRIMARY KEY (`id_c`,`id_order`,`id_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `events_schedule` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_hall` bigint NOT NULL,
  `hebrew_date` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aaa` (`id_hall`,`hebrew_date`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `halls` (
  `id_hall` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name_hall` varchar(255) NOT NULL,
  `base_price` bigint NOT NULL,
  `max_guests` bigint NOT NULL,
  `min_meals` bigint NOT NULL,
  `p_b_adults` bigint NOT NULL,
  `p_b_children` bigint NOT NULL,
  `p_b_bar` bigint NOT NULL,
  `p_p_adults` bigint NOT NULL,
  `p_p_children` bigint NOT NULL,
  `p_p_bar` bigint NOT NULL,
  `down_payment` bigint NOT NULL,
  PRIMARY KEY (`id_hall`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `id_image` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `id_hall` bigint NOT NULL,
  PRIMARY KEY (`id_image`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `invoices` (
  `id_invoice` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) NOT NULL,
  `payment` bigint NOT NULL,
  `date` varchar(255) NOT NULL,
  `hebrew_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_invoice`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `managers_halls` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_user` bigint NOT NULL,
  `id_hall` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `id_order` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_hall` bigint NOT NULL,
  `num_guests` bigint NOT NULL,
  `num_m_adults` bigint NOT NULL,
  `num_m_children` bigint NOT NULL,
  `num_m_bar` bigint NOT NULL,
  `type` char(255) NOT NULL,
  `total_payment` bigint NOT NULL,
  `hebrew_date` varchar(45) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_order`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id_user` bigint unsigned NOT NULL AUTO_INCREMENT,
  `degree` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` bigint DEFAULT NULL,
  `side` char(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;








