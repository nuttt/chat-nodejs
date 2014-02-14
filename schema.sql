# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.15)
# Database: node_chat
# Generation Time: 2557-02-14 06:43:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table msg
# ------------------------------------------------------------

DROP TABLE IF EXISTS `msg`;

CREATE TABLE `msg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) DEFAULT NULL,
  `room_id` int(11) unsigned DEFAULT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `room_id_idx` (`room_id`),
  CONSTRAINT `msg_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `msg_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `msg` WRITE;
/*!40000 ALTER TABLE `msg` DISABLE KEYS */;

INSERT INTO `msg` (`id`, `user_id`, `room_id`, `message`, `timestamp`)
VALUES
	(1,NULL,NULL,'Hello World','0000-00-00 00:00:00'),
	(2,'Nuttapon.P',23,'hey','2014-02-13 12:50:28'),
	(3,'Nuttapon.P',23,'yo','2014-02-13 12:50:29'),
	(4,'Vibhavee.T',23,'Hi','2014-02-13 12:50:32'),
	(5,'Nuttapon.P',1,'test','2014-02-13 12:50:38'),
	(6,'Vibhavee.T',23,'123','2014-02-13 12:50:44'),
	(7,'Park.N',32,'1','2014-02-13 13:13:25'),
	(8,'Park.N',32,'2','2014-02-13 13:13:26'),
	(9,'Park.N',32,'3','2014-02-13 13:13:28'),
	(10,'Vibhavee.T',32,'1','2014-02-13 13:13:33'),
	(11,'Vibhavee.T',32,'2','2014-02-13 13:13:34'),
	(12,'Vibhavee.T',32,'3','2014-02-13 13:13:35'),
	(13,'Park.N',32,'1','2014-02-13 13:13:41'),
	(14,'Park.N',32,'2','2014-02-13 13:13:43'),
	(15,'Park.N',32,'3','2014-02-13 13:13:47'),
	(16,'Vibhavee.T',32,'1','2014-02-13 13:13:50'),
	(17,'Park.N',32,'1','2014-02-13 13:13:50'),
	(18,'Vibhavee.T',32,'2','2014-02-13 13:13:51'),
	(19,'Park.N',32,'2','2014-02-13 13:13:51'),
	(20,'Park.N',32,'3','2014-02-13 13:13:52'),
	(21,'Vibhavee.T',32,'3','2014-02-13 13:13:53'),
	(22,'Vibhavee.T',33,'Hi Park!','2014-02-13 13:17:22'),
	(23,'Park.N',33,'hi','2014-02-13 13:17:24'),
	(24,'Vibhavee.T',33,'How are you?','2014-02-13 13:17:25'),
	(25,'Park.N',33,'i\'m ok','2014-02-13 13:17:29'),
	(26,'Vibhavee.T',33,'Let\'s go eat.','2014-02-13 13:17:38'),
	(27,'Park.N',33,'good idea','2014-02-13 13:17:46'),
	(28,'Park.N',33,'1','2014-02-13 13:17:49'),
	(29,'Vibhavee.T',33,'1','2014-02-13 13:17:49'),
	(30,'Park.N',33,'2','2014-02-13 13:17:51'),
	(31,'Vibhavee.T',33,'2','2014-02-13 13:17:51'),
	(32,'Park.N',33,'3','2014-02-13 13:17:52'),
	(33,'Vibhavee.T',33,'3','2014-02-13 13:17:52'),
	(34,'Park.N',33,'หายไปไหน','2014-02-13 13:18:14'),
	(35,'Park.N',33,'ๅ','2014-02-13 13:18:18'),
	(36,'Park.N',33,'1','2014-02-13 13:18:20'),
	(37,'Park.N',33,'2','2014-02-13 13:18:20'),
	(38,'Park.N',33,'3','2014-02-13 13:18:22'),
	(39,'Park.N',33,'...','2014-02-13 13:18:25'),
	(40,'Vibhavee.T',33,'กินที่ไหนดี','2014-02-13 13:19:02'),
	(41,'Park.N',33,'สามย่าน','2014-02-13 13:19:06'),
	(42,'Vibhavee.T',33,'ไม่เอา ไกล','2014-02-13 13:19:09'),
	(43,'Park.N',33,'นิดเดียวเอง','2014-02-13 13:19:16'),
	(44,'Park.N',33,'อ้าว','2014-02-13 13:19:23'),
	(45,'Park.N',33,'ไปไหนแล้ว','2014-02-13 13:19:26'),
	(46,'Park.N',33,'ไปๆกินๆ','2014-02-13 13:19:33'),
	(47,'Vibhavee.T',33,'อ่าว ยังไม่ไปอีกหรอ','2014-02-13 13:19:45'),
	(48,'Park.N',33,'ยังๆ','2014-02-13 13:19:52'),
	(49,'Vibhavee.T',33,'มาแล้วหรอ','2014-02-13 13:20:17'),
	(50,'Vibhavee.T',33,'ไปไหนมา','2014-02-13 13:20:19'),
	(51,'Vibhavee.T',32,'Is there anyone here?','2014-02-13 13:49:28'),
	(52,'Vibhavee.T',32,':(','2014-02-13 13:49:31'),
	(53,'Park.N',23,'asdasdasd','2014-02-13 14:04:55'),
	(54,'Park.N',23,'asdsa','2014-02-13 14:04:59'),
	(55,'Park.N',23,'dsa','2014-02-13 14:04:59'),
	(56,'Vibhavee.T',35,'T_T','2014-02-13 14:07:15'),
	(57,'Nuttapon.P',35,'??','2014-02-13 14:07:20'),
	(58,'Vibhavee.T',36,'ไปกินซีฟู๊ดกัน','2014-02-13 14:09:07'),
	(59,'Nuttapon.P',36,'??','2014-02-13 14:09:10'),
	(60,'Park.N',36,'ไปๆ','2014-02-13 14:09:12'),
	(61,'Nuttapon.P',36,'กินไหน','2014-02-13 14:09:20'),
	(62,'Vibhavee.T',36,'ที่ไหนดี','2014-02-13 14:09:22'),
	(63,'Park.N',36,'สามย่าน','2014-02-13 14:09:25'),
	(64,'Vibhavee.T',36,'ไม่เอา ไกล','2014-02-13 14:09:29'),
	(65,'Nuttapon.P',36,'หายไปไหนกันหมดง่าส์ T_T','2014-02-13 14:14:26');

/*!40000 ALTER TABLE `msg` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table room
# ------------------------------------------------------------

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
  `room_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `room_name` varchar(100) NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;

INSERT INTO `room` (`room_id`, `room_name`)
VALUES
	(1,'Kamol.K / Kankawin.K / Chanon.J / Panisa.S'),
	(2,'Tayida.T / Thanatcha.L / Taweekiat.T'),
	(3,'Pradinan.P / Siraphob R. / Theeruch K.'),
	(4,'Pinhathai.L / Pakawin.M / Ekapop.V'),
	(5,'Kanittha.T / Donn.T / Akkawat.L'),
	(6,'Adsadawut.C / Anon.W / Ariyawat.C'),
	(7,'Jamorn.S'),
	(8,'Thanyaporn.Mak / Pachara.Pet/Sarin.D'),
	(9,'Warot.V / Lattapon.J / Hasavee.W'),
	(10,'Chanet.S / Chaowalit.L'),
	(11,'Noppayut.S / Wichayut.E / Nawapat.M'),
	(12,'Kasin.N / Kavin.J / Kanokporn.Pht'),
	(13,'Nontawat.Ch / Pannavat.T / Sarin.A'),
	(14,'Peeranut .L / Pongbhop.N / Auttarat.N'),
	(15,'Yuranan.k / Poopah.J / Sittinut.J'),
	(16,'Quanruthai.T/ Pongsathorn.P / Patcharawut.N'),
	(17,'Kritsana.J / Kawin.W / Wongsagorn.Y'),
	(18,'Panida.Ni/ Nasakol.P/ Peetikorn.J'),
	(19,'Mondit.t / Matthanapol.K / Jit.L'),
	(20,'Kritsada.Li / Thanarak.T'),
	(21,'Kittipat S./ Pawarit S./ Chanavit A.'),
	(22,'Thanakom.S/ Apitai.K/ /Kritsana.S'),
	(23,'Group V'),
	(24,'Jiraphon.S / Pariyawit.J / Piyawat.L'),
	(25,'Tawit.K/Supanuth.A/Suwapat.K'),
	(26,'Krittaboon.T / Potsawee.V / Natchaya.L'),
	(27,'Kulvaree.Ch / Watchara.Th / Nat.Um'),
	(28,'Pirath K. / Thanakorn T. / Peerut B.'),
	(29,'New group'),
	(30,'Vee\'s Group!!'),
	(31,'Demo Group'),
	(32,'Demo Group 2'),
	(33,'Demo Group 3'),
	(34,'Eating Group'),
	(35,'Dinner Group'),
	(36,'Seafood Buffet');

/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`user_id`)
VALUES
	('Adsadawut.C'),
	('Akkawat.L'),
	('Anon.W'),
	('Apitai.K'),
	('Ariyawat.C'),
	('Auttarat.N'),
	('Chanavit.A'),
	('Chanet.S'),
	('Chanon.J'),
	('Chaowalit.L'),
	('Donn.T'),
	('Ekapop.V'),
	('Hasavee.W'),
	('Jamorn.S'),
	('Jiraphon.S'),
	('Jit.L'),
	('Kamol.K'),
	('Kanittha.T'),
	('Kankawin.K'),
	('Kanokporn.Pht'),
	('Kasin.N'),
	('Kavin.J'),
	('Kawin.W'),
	('Kittipat.S'),
	('Kritsada.Li'),
	('Kritsana.J'),
	('Kritsana.S'),
	('Krittaboon.T'),
	('Kulvaree.Ch'),
	('Lattapon.J'),
	('Matthanapol.K'),
	('Mondit.t'),
	('Nasakol.P'),
	('Nat.Um'),
	('Natchaya.L'),
	('Nawapat.M'),
	('Nontawat.Ch'),
	('Noppayut.S'),
	('Nuttapon.P'),
	('Pachara.Pet'),
	('Pakawin.M'),
	('Panida.Ni'),
	('Panisa.S'),
	('Pannavat.T'),
	('Pariyawit.J'),
	('Park.N'),
	('Patcharawut.N'),
	('Pawarit.S'),
	('Peeranut.L'),
	('Peerut.B'),
	('Peetikorn.J'),
	('Pinhathai.L'),
	('Pirath.K'),
	('Piyawat.L'),
	('Pongbhop.N'),
	('Pongsathorn.P'),
	('Poopah.J'),
	('Potsawee.V'),
	('Pradinan.P'),
	('Quanruthai.T'),
	('Sarin.A'),
	('Sarin.D'),
	('Siraphob.R'),
	('Sittinut.J'),
	('Supanuth.A'),
	('Suwapat.K'),
	('Taweekiat.T'),
	('Tawit.K'),
	('Tayida.T'),
	('Thanakom.S'),
	('Thanakorn.T'),
	('Thanarak.T'),
	('Thanatcha.L'),
	('Thanyaporn.Mak'),
	('Theeruch.K'),
	('Vibhavee.T'),
	('Warot.V'),
	('Watchara.Th'),
	('Wichayut.E'),
	('Wongsagorn.Y'),
	('Yuranan.k');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table userroom
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userroom`;

CREATE TABLE `userroom` (
  `user_id` varchar(20) NOT NULL,
  `room_id` int(11) unsigned NOT NULL,
  `last_read` int(11) DEFAULT '0',
  PRIMARY KEY (`user_id`,`room_id`),
  KEY `room_id_idx` (`room_id`),
  CONSTRAINT `room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `userroom` WRITE;
/*!40000 ALTER TABLE `userroom` DISABLE KEYS */;

INSERT INTO `userroom` (`user_id`, `room_id`, `last_read`)
VALUES
	('Nuttapon.P',1,5),
	('Nuttapon.P',23,6),
	('Nuttapon.P',34,1),
	('Nuttapon.P',35,57),
	('Nuttapon.P',36,65),
	('Park.N',23,55),
	('Park.N',35,56),
	('Park.N',36,63),
	('Vibhavee.T',23,6),
	('Vibhavee.T',32,52),
	('Vibhavee.T',35,57),
	('Vibhavee.T',36,64);

/*!40000 ALTER TABLE `userroom` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
