-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
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
  `additional_fields` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fund_id` (`fund_id`),
  KEY `applicant_id` (`applicant_id`),
  CONSTRAINT `funding_applications_ibfk_1` FOREIGN KEY (`fund_id`) REFERENCES `funding_opportunities` (`id`),
  CONSTRAINT `funding_applications_ibfk_2` FOREIGN KEY (`applicant_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funding_applications`
--

LOCK TABLES `funding_applications` WRITE;
/*!40000 ALTER TABLE `funding_applications` DISABLE KEYS */;
INSERT INTO `funding_applications` VALUES (28,6,'rejected','user_2fQ0wPce315v8apZ3k95qdAQ5e1','[]','\"[]\"'),(29,5,'rejected','user_2fQ0wPce315v8apZ3k95qdAQ5e1','[]','\"[]\"'),(30,8,'approved','user_2fQ0wPce315v8apZ3k95qdAQ5e1','[]','\"[]\"'),(31,7,'approved','user_2fQ0wPce315v8apZ3k95qdAQ5e1','[]','\"[]\"'),(32,5,'approved','user_2fdvwj4kwAAUC1BGkiZ1h5RRYfq','[]','\"[]\"'),(33,4,'pending','user_2feQFiOlDop780ICmITQhV7ZXhF','[]','\"[]\"'),(34,8,'approved','user_2feQFiOlDop780ICmITQhV7ZXhF','[]','\"[]\"'),(35,4,'approved','user_2fSQMwKhKzKgb1ks9Wxa5ZC59wG','[]','\"[]\"'),(36,16,'approved','user_2gghW24I4z6pbohHoFxUne9O0o0','[]','\"[{\\\"label\\\":\\\"Are both your parents employed?\\\",\\\"value\\\":\\\"Yes\\\"}]\"'),(37,17,'approved','user_2gxGEIo97sot56XQfSfvVHvC0n1','[\"uploads/user_documents/user_2gxGEIo97sot56XQfSfvVHvC0n1/Personal Statement (500 words)-1716633787557.jpg\", \"uploads/user_documents/user_2gxGEIo97sot56XQfSfvVHvC0n1/Report-1716633787557.pdf\", \"uploads/user_documents/user_2gxGEIo97sot56XQfSfvVHvC0n1/Household Income Pay slips-1716633789461.docx\", \"uploads/user_documents/user_2gxGEIo97sot56XQfSfvVHvC0n1/Identity Document-1716633789462.jpg\"]','\"[{\\\"label\\\":\\\"Full Name\\\",\\\"value\\\":\\\"Sisekelo Ngcobo\\\"},{\\\"label\\\":\\\"Address\\\",\\\"value\\\":\\\"128\\\"},{\\\"label\\\":\\\"City/Town\\\",\\\"value\\\":\\\"Johannesburg\\\"},{\\\"label\\\":\\\"Postal Code\\\",\\\"value\\\":\\\"2000\\\"},{\\\"label\\\":\\\"Phone Number\\\",\\\"value\\\":\\\"0737596910\\\"},{\\\"label\\\":\\\"Date Of Birth\\\",\\\"value\\\":\\\"2024-05-01\\\"},{\\\"label\\\":\\\"Nationality\\\",\\\"value\\\":\\\"South ...\\\"},{\\\"label\\\":\\\"ID/Passport Number\\\",\\\"value\\\":\\\"-5\\\"},{\\\"label\\\":\\\"Province\\\",\\\"value\\\":\\\"KwaZulu-Natal\\\"},{\\\"label\\\":\\\"Email Address\\\",\\\"value\\\":\\\"qwertyui@gmail.com\\\"},{\\\"label\\\":\\\"Household Combined Income\\\",\\\"value\\\":\\\"123457654\\\"},{\\\"label\\\":\\\"Number of Dependents in Household\\\",\\\"value\\\":\\\"6\\\"},{\\\"label\\\":\\\"Are you currently receiving any other scholarships/bursaries?\\\",\\\"value\\\":\\\"No\\\"},{\\\"label\\\":\\\"If yes, please specify:\\\",\\\"value\\\":\\\"N/A\\\"},{\\\"label\\\":\\\"Describe Your Involvement in Community Service/Extracurricular Activities\\\",\\\"value\\\":\\\"Sooaiush uasgtfduwk aknshgcyta dayufda jsiaud adh iada jdhayu waidj adf t daud y dakuh dmshgdy t ahdw ytfdamds dgyfdt wfd adf trwadhwud awrdahdya dyai dkawndiuwgdw dashdyus xz xsatyd wakd akuhd wtdy a drawdt aytdaid awbdu wdfw ytwf dwra wyadaw udiwa dwyu dwjy diwh wid wtydfrtd starda d wd wiud qdjiawdwiwdh ywwftd rw wqduh diudwiwd yddt d f tdwywudw idwidhyugdtfqy dyqgwy dqi dywdf qyt guqgdyt qfdyaiuda iduayd gwytyagd uqjwjdoi dwuhduyqwgd uydguyqwdgtwdfyuwu uwdgyqg quwdgyuq uwqg wq ydwtdqf diaj oiw pqwo eg fts fau eiefh e fwey fegywgeuwifhai fyu fqui feygfqu hqo fufgqu hf\\\"},{\\\"label\\\":\\\"Reference Name\\\",\\\"value\\\":\\\"uiehfuwf\\\"},{\\\"label\\\":\\\"Reference Position\\\",\\\"value\\\":\\\"auhfe u\\\"},{\\\"label\\\":\\\"Reference Contact Number\\\",\\\"value\\\":\\\"0737596426432\\\"},{\\\"label\\\":\\\"Reference Email Address\\\",\\\"value\\\":\\\"qwert12@asdfghj.com\\\"}]\"'),(38,16,'pending','user_2gymcXum8JDc1DPVMM8eE53drMk','[]','\"[{\\\"label\\\":\\\"Are both your parents employed?\\\",\\\"value\\\":\\\"No\\\"}]\"');
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
  `additional_fields` json DEFAULT NULL,
  `required_files` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `funding_opportunities_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funding_opportunities`
--

LOCK TABLES `funding_opportunities` WRITE;
/*!40000 ALTER TABLE `funding_opportunities` DISABLE KEYS */;
INSERT INTO `funding_opportunities` VALUES (4,'Community Development Fund','A fund to support community development projects.',50000.00,'2024-12-31','2024-06-01','2024-12-31','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL,NULL,NULL),(5,'Education Grant','Grants for educational initiatives and programs.',100000.00,'2024-11-30','2024-07-01','2024-11-30','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL,NULL,NULL),(6,'Healthcare Support Fund','Funding for healthcare facilities and services.',75000.00,'2024-10-15','2024-05-15','2024-10-15','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL,NULL,NULL),(7,'Environmental Protection Grant','Grants to support environmental protection projects.',85000.00,'2024-09-30','2024-06-15','2024-09-30','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL,NULL,NULL),(8,'Small Business Grant','Funding for small businesses to foster growth and innovation.',60000.00,'2024-08-31','2024-06-01','2024-08-31','user_2fRrReuhQitawnUcZeQsEu70VIl',NULL,NULL,NULL),(16,'BSc Bursary','Bursary For All undergrad students in the science faculty.\r\nCovers full tuitionn, Housing and Meals.',350000.00,'2024-05-31','2024-05-25','2025-01-01','user_2fSQMwKhKzKgb1ks9Wxa5ZC59wG','uploads/funding_opportunities/bsc_bursary/image-1716615056260.png','\"[{\\\"name\\\":\\\"Are both your parents employed?\\\",\\\"description\\\":\\\"Patients info\\\",\\\"data_type\\\":\\\"boolean\\\"}]\"','\"[{\\\"file_name\\\":\\\"YEAR OF STUDY\\\",\\\"description\\\":\\\"What year are you doing currently\\\"},{\\\"file_name\\\":\\\"Year of Graduation (expected*)\\\",\\\"description\\\":\\\"When will you graduate for you BSc\\\"}]\"'),(17,'Aspire for Excellence Foundation','At Aspire for Excellence Foundation, we believe that education is the key to unlocking a brighter future. Unfortunately, for many talented and deserving students, financial barriers stand in the way of their educational dreams. That’s where you come in.\r\n\r\nWhy Fund a Scholarship?\r\n\r\nTransform Lives: Your support can provide students with the opportunity to achieve their academic goals, pursue their passions, and secure a better future.\r\nPromote Equality: Help bridge the gap between potential and opportunity by making education accessible to all, regardless of financial background.\r\nInvest in the Community: Educated individuals contribute positively to society, fostering innovation, economic growth, and community development.\r\nThe Bursary Covers:\r\n\r\nTuition Fees: Cover the cost of classes and educational resources.\r\nBooks and Supplies: Ensure students have the materials they need to succeed.\r\nLiving Expenses: Assist with housing, meals, and transportation, allowing students to focus on their studies.\r\nWho is Eligible to Apply:\r\n\r\nSouth African Citizen: Must be a citizen of South Africa.\r\nAcademic Performance:\r\nIf still in matric (final year of high school), a minimum average of 75%.\r\nIf already in university, a minimum average of 60%.\r\nFinancial Need: Demonstrate a need for financial assistance.\r\nCommunity Involvement: Active participation in community service or extracurricular activities.\r\nLeadership Potential: Show potential for leadership and a commitment to making a positive impact',100000.00,'2024-07-31','2024-05-01','2024-07-31','user_2gxFsERqeUDYGfEUEd7Nog2uc9z','uploads/funding_opportunities/aspire_for_excellence_foundation/image-1716633321518.jpg','\"[{\\\"name\\\":\\\"Full Name\\\",\\\"description\\\":\\\"Full Name\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"Date Of Birth\\\",\\\"description\\\":\\\"Date Of Birth\\\",\\\"data_type\\\":\\\"date\\\"},{\\\"name\\\":\\\"Nationality\\\",\\\"description\\\":\\\"Nationality\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"ID/Passport Number\\\",\\\"description\\\":\\\"ID/Passport Number\\\",\\\"data_type\\\":\\\"number\\\"},{\\\"name\\\":\\\"Address\\\",\\\"description\\\":\\\"Address\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"City/Town\\\",\\\"description\\\":\\\"City/Town\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"Province\\\",\\\"description\\\":\\\"Province\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"Postal Code\\\",\\\"description\\\":\\\"Postal Code\\\",\\\"data_type\\\":\\\"number\\\"},{\\\"name\\\":\\\"Phone Number\\\",\\\"description\\\":\\\"Phone Number\\\",\\\"data_type\\\":\\\"number\\\"},{\\\"name\\\":\\\"Email Address\\\",\\\"description\\\":\\\"Email Address\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"Household Combined Income\\\",\\\"description\\\":\\\"Household Combined Income\\\",\\\"data_type\\\":\\\"number\\\"},{\\\"name\\\":\\\"Number of Dependents in Household\\\",\\\"description\\\":\\\"Number of Dependents in Household:\\\",\\\"data_type\\\":\\\"number\\\"},{\\\"name\\\":\\\"Are you currently receiving any other scholarships/bursaries?\\\",\\\"description\\\":\\\"Are you currently receiving any other scholarships/bursaries?\\\",\\\"data_type\\\":\\\"boolean\\\"},{\\\"name\\\":\\\"If yes, please specify:\\\",\\\"description\\\":\\\"If yes, please specify:\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"Describe Your Involvement in Community Service/Extracurricular Activities\\\",\\\"description\\\":\\\"Describe Your Involvement in Community Service/Extracurricular Activities\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"Reference Name\\\",\\\"description\\\":\\\"Teacher/Professor/Community Leader\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"Reference Position\\\",\\\"description\\\":\\\"Reference Position\\\",\\\"data_type\\\":\\\"text\\\"},{\\\"name\\\":\\\"Reference Contact Number\\\",\\\"description\\\":\\\"Reference Contact Number\\\",\\\"data_type\\\":\\\"number\\\"},{\\\"name\\\":\\\"Reference Email Address\\\",\\\"description\\\":\\\"Reference Email Address\\\",\\\"data_type\\\":\\\"text\\\"}]\"','\"[{\\\"file_name\\\":\\\"Personal Statement (500 words)\\\",\\\"description\\\":\\\"Describe your academic and career goals, your financial need, and how this scholarship will help you achieve your aspirations.\\\"},{\\\"file_name\\\":\\\"Attach Latest Academic Transcript/Report\\\",\\\"description\\\":\\\"Attach Latest Academic Transcript/Report Card If You Still In High School.\\\"},{\\\"file_name\\\":\\\"Household Income Pay slips\\\",\\\"description\\\":\\\"Household Income Pay Slips Not Older Than 3 Months\\\"},{\\\"file_name\\\":\\\"Identity Document\\\",\\\"description\\\":\\\"Upload A Certified Copy Of Your Identity Document\\\"}]\"');
/*!40000 ALTER TABLE `funding_opportunities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fund_id` int DEFAULT NULL,
  `body` varchar(255) NOT NULL,
  `user_id` varchar(120) DEFAULT NULL,
  `time_posted` datetime NOT NULL,
  `target_admins` tinyint(1) NOT NULL DEFAULT '0',
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fund_id` (`fund_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (2,1,'Notification body text','user123','2024-05-26 10:00:00',1,0),(3,16,'New Applicant','user123','2024-05-26 10:00:00',0,0);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
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
  `balance` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('user_2fdvwj4kwAAUC1BGkiZ1h5RRYfq','admin',0,'Theophilus Kgopa',0.00),('user_2feQFiOlDop780ICmITQhV7ZXhF','admin',0,'Kharendwe Negota',799000.00),('user_2flejTji7TX3uLDvK2ALSOf2XAI','admin',0,'Sisekelo Ngcobo',0.00),('user_2fQ0wPce315v8apZ3k95qdAQ5e1','fund_manager',0,'Daniel Ngobe',19999999.00),('user_2fRrReuhQitawnUcZeQsEu70VIl','admin',0,'DANIEL NGOBE',900000.00),('user_2fSQMwKhKzKgb1ks9Wxa5ZC59wG','admin',0,'Karabo Mofamere',2454000.00),('user_2gghW24I4z6pbohHoFxUne9O0o0','user',0,'Joshua Mofamere',0.00),('user_2gxF5qZuxuaInpZzHvrSEj4S905','user',0,'Victor Gomez',0.00),('user_2gxFNVRBehfMtW4jddPbU8ZChdU','user',0,'Samuel Sam',0.00),('user_2gxFsERqeUDYGfEUEd7Nog2uc9z','fund_manager',0,'Bathi Obas',800000.00),('user_2gxGEIo97sot56XQfSfvVHvC0n1','user',0,'Ringo Mdada',0.00),('user_2gymcXum8JDc1DPVMM8eE53drMk','user',0,'Karabo Joshua',0.00);
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

-- Dump completed on 2024-05-26 14:35:21
