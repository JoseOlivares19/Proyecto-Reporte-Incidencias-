-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: unireport_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adjunto`
--

DROP TABLE IF EXISTS `adjunto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adjunto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_subida` datetime(6) DEFAULT NULL,
  `nombre_archivo` varchar(255) DEFAULT NULL,
  `ruta_archivo` varchar(255) DEFAULT NULL,
  `tamanio_bytes` bigint DEFAULT NULL,
  `tipo_archivo` varchar(255) DEFAULT NULL,
  `incidencia_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9xu8fb45pmq6uw9takqghpuvy` (`incidencia_id`),
  CONSTRAINT `FK9xu8fb45pmq6uw9takqghpuvy` FOREIGN KEY (`incidencia_id`) REFERENCES `incidencia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adjunto`
--

LOCK TABLES `adjunto` WRITE;
/*!40000 ALTER TABLE `adjunto` DISABLE KEYS */;
/*!40000 ALTER TABLE `adjunto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activo` bit(1) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `sede_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK95bhvd5oq7pj3b6cyfyrmoveu` (`sede_id`),
  CONSTRAINT `FK95bhvd5oq7pj3b6cyfyrmoveu` FOREIGN KEY (`sede_id`) REFERENCES `sede` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracion_sistema`
--

DROP TABLE IF EXISTS `configuracion_sistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracion_sistema` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clave` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `valor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKn2k8b6hwyumsdfmax8vg0320m` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion_sistema`
--

LOCK TABLES `configuracion_sistema` WRITE;
/*!40000 ALTER TABLE `configuracion_sistema` DISABLE KEYS */;
/*!40000 ALTER TABLE `configuracion_sistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_incidencia`
--

DROP TABLE IF EXISTS `historial_incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_incidencia` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comentario` text,
  `estado_anterior` enum('CERRADO','DERIVADO','EN_PROCESO','REABIERTO','REGISTRADO','RESUELTO') DEFAULT NULL,
  `estado_nuevo` enum('CERRADO','DERIVADO','EN_PROCESO','REABIERTO','REGISTRADO','RESUELTO') DEFAULT NULL,
  `fecha_accion` datetime(6) DEFAULT NULL,
  `solucion_aplicada` text,
  `tiempo_dedicado_minutos` int DEFAULT NULL,
  `incidencia_id` bigint DEFAULT NULL,
  `usuario_accion_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrbn92d6c7rs0qamwud1tyik7` (`incidencia_id`),
  KEY `FK54lbqmh8gxkhw97p2a29gf87m` (`usuario_accion_id`),
  CONSTRAINT `FK54lbqmh8gxkhw97p2a29gf87m` FOREIGN KEY (`usuario_accion_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKrbn92d6c7rs0qamwud1tyik7` FOREIGN KEY (`incidencia_id`) REFERENCES `incidencia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_incidencia`
--

LOCK TABLES `historial_incidencia` WRITE;
/*!40000 ALTER TABLE `historial_incidencia` DISABLE KEYS */;
INSERT INTO `historial_incidencia` VALUES (1,'Actualizado','REGISTRADO','EN_PROCESO','2026-06-06 16:43:49.414192',NULL,NULL,1,1),(2,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:05.233488',NULL,NULL,1,1),(3,'Actualizado','EN_PROCESO','RESUELTO','2026-06-06 16:44:09.494272',NULL,NULL,1,1),(4,'Reapertura solicitada: Persistencia del problema','RESUELTO','REABIERTO','2026-06-06 16:44:21.759726',NULL,NULL,1,1),(5,'Actualizado','REABIERTO','EN_PROCESO','2026-06-06 16:44:23.111893',NULL,NULL,1,1),(6,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:23.506933',NULL,NULL,1,1),(7,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:23.660945',NULL,NULL,1,1),(8,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:23.821959',NULL,NULL,1,1),(9,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:23.976957',NULL,NULL,1,1),(10,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:24.422968',NULL,NULL,1,1),(11,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:24.782722',NULL,NULL,1,1),(12,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:25.042556',NULL,NULL,1,1),(13,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:25.228558',NULL,NULL,1,1),(14,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:25.392561',NULL,NULL,1,1),(15,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:25.561556',NULL,NULL,1,1),(16,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:25.719556',NULL,NULL,1,1),(17,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:25.882554',NULL,NULL,1,1),(18,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:26.031569',NULL,NULL,1,1),(19,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:26.197568',NULL,NULL,1,1),(20,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:26.347579',NULL,NULL,1,1),(21,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:26.507580',NULL,NULL,1,1),(22,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:26.681584',NULL,NULL,1,1),(23,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:26.826557',NULL,NULL,1,1),(24,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:32.074392',NULL,NULL,1,1),(25,'Actualizado','EN_PROCESO','EN_PROCESO','2026-06-06 16:44:44.798424',NULL,NULL,1,1),(26,'Actualizado','EN_PROCESO','RESUELTO','2026-06-06 17:00:21.980699',NULL,NULL,1,1),(27,'Reapertura solicitada: asd','RESUELTO','REABIERTO','2026-06-06 17:00:29.989041',NULL,NULL,1,1),(28,'Actualizado','REABIERTO','EN_PROCESO','2026-06-06 17:03:11.229074',NULL,NULL,1,1),(29,'Actualizado','EN_PROCESO','RESUELTO','2026-06-06 17:03:16.350420',NULL,NULL,1,1),(30,'Actualizado','REGISTRADO','EN_PROCESO','2026-06-06 17:09:56.540428',NULL,NULL,2,1),(31,'Reapertura solicitada: aasd','RESUELTO','REABIERTO','2026-06-06 18:09:46.730673',NULL,NULL,1,1),(32,'Actualizado','REABIERTO','EN_PROCESO','2026-06-06 18:09:48.364677',NULL,NULL,1,1),(33,'Actualizado','REGISTRADO','RESUELTO','2026-07-10 15:26:34.123207',NULL,NULL,4,1),(34,'Reapertura solicitada: testing','RESUELTO','REABIERTO','2026-07-10 15:26:54.349384',NULL,NULL,4,1),(35,'Actualizado','EN_PROCESO','RESUELTO','2026-07-10 15:27:06.087725',NULL,NULL,1,1),(36,'Actualizado','REABIERTO','EN_PROCESO','2026-07-10 16:19:22.376988',NULL,NULL,4,1),(37,'Actualizado','REGISTRADO','RESUELTO','2026-07-10 16:19:32.065394',NULL,NULL,3,1),(38,'Actualizado','REGISTRADO','EN_PROCESO','2026-07-10 16:20:37.475691',NULL,NULL,8,1),(39,'Actualizado','REGISTRADO','EN_PROCESO','2026-07-10 16:26:51.351405',NULL,NULL,11,1),(40,'Actualizado','REGISTRADO','EN_PROCESO','2026-07-10 16:26:54.601089',NULL,NULL,9,1),(41,'Reapertura solicitada: volvio el problem','RESUELTO','REABIERTO','2026-07-10 16:27:07.821789',NULL,NULL,1,1);
/*!40000 ALTER TABLE `historial_incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidencia`
--

DROP TABLE IF EXISTS `incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidencia` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `categoria` enum('INFRAESTRUCTURA','OTROS','SEGURIDAD','TECNOLOGIA') DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `escalado` bit(1) DEFAULT NULL,
  `estado` enum('CERRADO','DERIVADO','EN_PROCESO','REABIERTO','REGISTRADO','RESUELTO') DEFAULT NULL,
  `fecha_actualizacion` datetime(6) DEFAULT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `fecha_escalado` datetime(6) DEFAULT NULL,
  `fecha_limite_atencion` datetime(6) DEFAULT NULL,
  `motivo` text,
  `prioridad` enum('ALTA','BAJA','CRITICA','MEDIA') DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `area_id` bigint DEFAULT NULL,
  `asignado_a_id` bigint DEFAULT NULL,
  `reportado_por_id` bigint DEFAULT NULL,
  `sede_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6ehfrat6ab7n8bde9h25j417g` (`codigo`),
  KEY `FKks3krlykj9jp76r3jtltyicdy` (`area_id`),
  KEY `FKsc8e2hmuarqod5arcayq2i3vt` (`asignado_a_id`),
  KEY `FKcc7pk4lxqxhchs1tak9f40voj` (`reportado_por_id`),
  KEY `FK2g5vsrwgymla1w2g25qjmv1g7` (`sede_id`),
  CONSTRAINT `FK2g5vsrwgymla1w2g25qjmv1g7` FOREIGN KEY (`sede_id`) REFERENCES `sede` (`id`),
  CONSTRAINT `FKcc7pk4lxqxhchs1tak9f40voj` FOREIGN KEY (`reportado_por_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKks3krlykj9jp76r3jtltyicdy` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`),
  CONSTRAINT `FKsc8e2hmuarqod5arcayq2i3vt` FOREIGN KEY (`asignado_a_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidencia`
--

LOCK TABLES `incidencia` WRITE;
/*!40000 ALTER TABLE `incidencia` DISABLE KEYS */;
INSERT INTO `incidencia` VALUES (1,'TECNOLOGIA','50A8BA98','No se puede descargar paquetes npm',_binary '','REABIERTO','2026-07-10 16:27:07.747058','2026-06-06 16:35:48.327432','2026-06-07 21:59:14.049045','2026-06-07 16:35:48.327432','Generado desde portal web','MEDIA','Problemas de descarga',NULL,NULL,1,NULL),(2,'TECNOLOGIA','35014036','No se puede descargar paquetes npm',_binary '','EN_PROCESO','2026-06-06 17:09:56.517427','2026-06-06 16:43:27.520204','2026-06-07 21:59:17.852837','2026-06-07 16:43:27.520204','Generado desde portal web','MEDIA','Problemas de descarga',NULL,NULL,1,NULL),(3,'TECNOLOGIA','5DF87C5D','prueba',_binary '','RESUELTO','2026-07-10 16:19:32.050818','2026-06-06 17:01:14.760787','2026-06-07 21:59:20.752308','2026-06-07 17:01:14.760787','Generado desde portal web','MEDIA','prueba',NULL,NULL,1,NULL),(4,'TECNOLOGIA','D831EF81','prueba',_binary '','EN_PROCESO','2026-07-10 16:19:22.343108','2026-06-06 17:01:22.639612','2026-06-07 21:59:23.506302','2026-06-07 17:01:22.639612','Generado desde portal web','MEDIA','prueba',NULL,NULL,1,NULL),(5,'TECNOLOGIA','2D34EA19','Tengo examne go',_binary '','REGISTRADO',NULL,'2026-07-10 15:24:01.070485','2026-07-10 15:24:01.098100','2026-07-11 15:24:01.070485','Generado desde portal web','ALTA','No hay luz en todo el salon',NULL,NULL,1,NULL),(6,'SEGURIDAD','6D5D05B9','USA',_binary '','REGISTRADO',NULL,'2026-07-10 15:26:22.266184','2026-07-10 15:26:22.286350','2026-07-11 15:26:22.266184','Generado desde portal web','CRITICA','Alumno no atorizado armado',NULL,NULL,1,NULL),(7,'INFRAESTRUCTURA','B4830183','wa',_binary '\0','REGISTRADO',NULL,'2026-07-10 15:41:15.854651',NULL,'2026-07-11 15:41:15.854651','Generado desde portal web','MEDIA','mes',NULL,NULL,1,NULL),(8,'OTROS','F4A16AF7','Alumnos atrapados :v',_binary '','EN_PROCESO','2026-07-10 16:20:37.462087','2026-07-10 16:19:55.052091','2026-07-10 16:19:55.072754','2026-07-11 16:19:55.052091','Generado desde portal web','CRITICA','Terremoto destruyo la pared',NULL,NULL,1,NULL),(9,'TECNOLOGIA','65C74F13','help me',_binary '\0','EN_PROCESO','2026-07-10 16:26:54.583158','2026-07-10 16:20:22.972819',NULL,'2026-07-11 16:20:22.972819','Generado desde portal web','BAJA','No prende el proyector',NULL,NULL,1,NULL),(10,'TECNOLOGIA','C05ABDB3','asda',_binary '\0','REGISTRADO',NULL,'2026-07-10 16:23:27.898702',NULL,'2026-07-11 16:23:27.898702','Generado desde portal web','MEDIA','wa',NULL,NULL,1,NULL),(11,'OTROS','81615176','testing 2',_binary '\0','EN_PROCESO','2026-07-10 16:26:51.328916','2026-07-10 16:26:40.095319',NULL,'2026-07-11 16:26:40.095319','Generado desde portal web','BAJA','gaaa',NULL,NULL,1,NULL),(12,'TECNOLOGIA','141BF529','Sale un mono morado ayuda',_binary '','REGISTRADO',NULL,'2026-07-10 16:40:23.745080','2026-07-10 16:40:23.760341','2026-07-11 16:40:23.745080','Generado desde portal web','CRITICA','PC virus',NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `enviado` bit(1) DEFAULT NULL,
  `fecha_envio` datetime(6) DEFAULT NULL,
  `mensaje` text,
  `tipo` enum('EMAIL','SISTEMA') DEFAULT NULL,
  `incidencia_id` bigint DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj8dj0degl5hbm41dnddoqq0yw` (`incidencia_id`),
  KEY `FK5hnclv9lmmc1w4335x04warbm` (`usuario_id`),
  CONSTRAINT `FK5hnclv9lmmc1w4335x04warbm` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKj8dj0degl5hbm41dnddoqq0yw` FOREIGN KEY (`incidencia_id`) REFERENCES `incidencia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reapertura_incidencia`
--

DROP TABLE IF EXISTS `reapertura_incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reapertura_incidencia` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `aprobado` bit(1) DEFAULT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `motivo` text,
  `aprobado_por_id` bigint DEFAULT NULL,
  `incidencia_id` bigint DEFAULT NULL,
  `solicitado_por_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7ytytugsbkpcv3t3xst95xo24` (`aprobado_por_id`),
  KEY `FKhd04j0uhlctw8my4cxaddhlcl` (`incidencia_id`),
  KEY `FKa1q5fjhuj596q5nqk8jdxiwi9` (`solicitado_por_id`),
  CONSTRAINT `FK7ytytugsbkpcv3t3xst95xo24` FOREIGN KEY (`aprobado_por_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKa1q5fjhuj596q5nqk8jdxiwi9` FOREIGN KEY (`solicitado_por_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKhd04j0uhlctw8my4cxaddhlcl` FOREIGN KEY (`incidencia_id`) REFERENCES `incidencia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reapertura_incidencia`
--

LOCK TABLES `reapertura_incidencia` WRITE;
/*!40000 ALTER TABLE `reapertura_incidencia` DISABLE KEYS */;
INSERT INTO `reapertura_incidencia` VALUES (1,_binary '\0','2026-06-06 16:44:21.746724','Persistencia del problema',NULL,1,1),(2,_binary '\0','2026-06-06 17:00:29.984041','asd',NULL,1,1),(3,_binary '\0','2026-06-06 18:09:46.722672','aasd',NULL,1,1),(4,_binary '\0','2026-07-10 15:26:54.328774','testing',NULL,4,1),(5,_binary '\0','2026-07-10 16:27:07.795954','volvio el problem',NULL,1,1);
/*!40000 ALTER TABLE `reapertura_incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activo` bit(1) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activo` bit(1) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('ADMINISTRADOR','ADMINISTRATIVO','DOCENTE','ESTUDIANTE','SUPERVISOR') DEFAULT NULL,
  `area_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK5171l57faosmj8myawaucatdw` (`email`),
  KEY `FKq69b03obyc0tcb84yv48lh62` (`area_id`),
  CONSTRAINT `FKq69b03obyc0tcb84yv48lh62` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,_binary '','UTP','admin@utp.edu.pe','2026-05-09 23:56:57.833119','ADMIN','$2a$10$oj2/3pVrJK4ZAWB/PXS0H.ZcNjOESXp0G61gdkHnPAhX4qxy7KnIC','ADMINISTRADOR',NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_sede`
--

DROP TABLE IF EXISTS `usuario_sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_sede` (
  `usuario_id` bigint NOT NULL,
  `sede_id` bigint NOT NULL,
  KEY `FKt0dlys0w941pjs5b07r3ah5ng` (`sede_id`),
  KEY `FKlr1332ai15s1531hcw81o9c8x` (`usuario_id`),
  CONSTRAINT `FKlr1332ai15s1531hcw81o9c8x` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKt0dlys0w941pjs5b07r3ah5ng` FOREIGN KEY (`sede_id`) REFERENCES `sede` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_sede`
--

LOCK TABLES `usuario_sede` WRITE;
/*!40000 ALTER TABLE `usuario_sede` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_sede` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-10 16:45:24
