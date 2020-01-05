-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: taxi_app
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` int(10) unsigned NOT NULL,
  `phoneno` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `license_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxi_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` double(9,6) DEFAULT NULL,
  `longitude` double(9,6) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ram Shrestha','driverram@gmail.com','$2y$10$SJnhlGf7vX5L7wXYMCE98udvSHO7NzufcFL5AQVxhbJ7tw0M8H5PG',2,'9845662948','46546465','Ba 09 4455',27.689733,85.321544,NULL,NULL,'2019-12-31 02:25:23','2019-12-31 02:25:23'),(2,'Varun Pradhan','varun@gmail.com','$2y$10$HnFTpOtyJ4PRhEvWfBqxze6MHxudm/kc0PwtslB8QeH7U0YuZwoyS',1,'9845662948',NULL,NULL,NULL,NULL,NULL,NULL,'2019-12-31 02:25:55','2019-12-31 02:25:55'),(3,'Hari Acharya','driverhari@gmail.com','$2y$10$0Q/NmuziAlFJXh1WmsFiSeMOP.ssf39YX3EOS6fVLTsKvLBQmTN9i',2,'9845662948','06-993849','Ba 7 Na 8909',27.699623,85.330061,NULL,NULL,'2019-12-31 02:28:27','2019-12-31 02:28:27'),(5,'Deepak Pradhan','deepak@gmail.com','$2y$10$PBqCZyGlMX1FuBu4LcqqguQY2Ba1hbMDEG3N86GFstaNxJl1Vv6nS',1,'9845662948',NULL,NULL,NULL,NULL,NULL,NULL,'2019-12-31 02:33:36','2019-12-31 02:33:36'),(6,'Manish bahadur rai','drivermanish@gmail.com','$2y$10$.WziZwuQDAG1e9KUrka.l..ogsG7Jse5D33k/KOYpLviTOFw1QDb6',2,'394394394','09-394839','Ba 03 Na 9834',27.697200,85.314500,NULL,NULL,'2020-01-04 12:48:23','2020-01-04 12:48:23'),(8,'dasdsad','asda@gmail.com','$2y$10$rcAsaQEmlO8Bp7LoLcs0T.th4NK1Mqb3p9S42.yEKoH4qJoPBDOvW',1,'343434',NULL,NULL,NULL,NULL,NULL,NULL,'2020-01-05 11:19:13','2020-01-05 11:19:13'),(10,'FuseMachine','fusemachine@gmail.com','$2y$10$yAwRSBW0xQl2wicXr79Tee40yE5OhJPwAMVwHPEQVjsUFoe7pBBpu',1,'9845662948',NULL,NULL,NULL,NULL,NULL,NULL,'2020-01-05 11:24:28','2020-01-05 11:24:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-05 23:03:28
