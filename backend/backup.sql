-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: grant-ease-server.mysql.database.azure.com    Database: grant_ease_db
-- ------------------------------------------------------
-- Server version	8.0.36-cluster

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fund_manager_info`
--

DROP TABLE IF EXISTS `fund_manager_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fund_manager_info` (
  `manager_id` varchar(50) NOT NULL,
  `balance` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`manager_id`),
  CONSTRAINT `fund_manager_info_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fund_manager_info`
--

LOCK TABLES `fund_manager_info` WRITE;
/*!40000 ALTER TABLE `fund_manager_info` DISABLE KEYS */;
INSERT INTO `fund_manager_info` VALUES ('user_2fRrReuhQitawnUcZeQsEu70VIl',200400.00);
/*!40000 ALTER TABLE `fund_manager_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funding_applications`
--

DROP TABLE IF EXISTS `funding_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funding_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fund_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `applicant_id` varchar(50) DEFAULT NULL,
  `attachments` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fund_id` (`fund_id`),
  KEY `applicant_id` (`applicant_id`),
  CONSTRAINT `funding_applications_ibfk_1` FOREIGN KEY (`fund_id`) REFERENCES `funding_opportunities` (`id`),
  CONSTRAINT `funding_applications_ibfk_2` FOREIGN KEY (`applicant_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funding_applications`
--

LOCK TABLES `funding_applications` WRITE;
/*!40000 ALTER TABLE `funding_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `funding_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funding_opportunities`
--

DROP TABLE IF EXISTS `funding_opportunities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  PRIMARY KEY (`id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `funding_opportunities_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funding_opportunities`
--

LOCK TABLES `funding_opportunities` WRITE;
/*!40000 ALTER TABLE `funding_opportunities` DISABLE KEYS */;
INSERT INTO `funding_opportunities` VALUES (4,'Community Development Fund','A fund to support community development projects.',50000.00,'2024-12-31','2024-06-01','2024-12-31','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL),(5,'Education Grant','Grants for educational initiatives and programs.',100000.00,'2024-11-30','2024-07-01','2024-11-30','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL),(6,'Healthcare Support Fund','Funding for healthcare facilities and services.',75000.00,'2024-10-15','2024-05-15','2024-10-15','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL),(7,'Environmental Protection Grant','Grants to support environmental protection projects.',85000.00,'2024-09-30','2024-06-15','2024-09-30','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL),(8,'Small Business Grant','Funding for small businesses to foster growth and innovation.',60000.00,'2024-08-31','2024-06-01','2024-08-31','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL);
/*!40000 ALTER TABLE `funding_opportunities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `is_banned` tinyint(1) NOT NULL DEFAULT '0',
  `full_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('user_2fRrReuhQitawnUcZeQsEu70VIl','admin',0,'DANIEL NGOBE');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

<<<<<<< HEAD
-- Dump completed on 2024-05-18 17:16:36
=======
-- Dump completed on 2024-05-18 17:20:00
>>>>>>> 8e1a0eb1a75a7b18c97da68ca852176c37baa27d
