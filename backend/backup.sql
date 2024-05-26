
DROP TABLE IF EXISTS `funding_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funding_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fund_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `applicant_id` varchar(50) DEFAULT NULL,
  `attachments` json DEFAULT NULL,
  `additional_fields` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fund_id` (`fund_id`),
  KEY `applicant_id` (`applicant_id`),
  CONSTRAINT `funding_applications_ibfk_1` FOREIGN KEY (`fund_id`) REFERENCES `funding_opportunities` (`id`),
  CONSTRAINT `funding_applications_ibfk_2` FOREIGN KEY (`applicant_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `funding_opportunities`;
CREATE TABLE `funding_opportunities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `amount` decimal(15,2) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `manager_id` varchar(36) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `additional_fields` json DEFAULT NULL,
  `required_files` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `funding_opportunities_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fund_id` int NULL,
  `body` varchar(255) NOT NULL,
  `user_id` varchar(120) NULL,
  `time_posted` datetime NOT NULL,
  `target_admins` tinyint(1) NOT NULL DEFAULT '0',
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fund_id` (`fund_id`),
  KEY `user_id` (`user_id`),
  -- CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`fund_id`) REFERENCES `funding_opportunities` (`id`),
  -- CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `is_banned` tinyint(1) NOT NULL DEFAULT '0',
  `full_name` varchar(100) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

