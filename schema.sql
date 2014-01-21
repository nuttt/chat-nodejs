# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.15)
# Database: node_chat
# Generation Time: 2557-01-21 10:58:34 +0000
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
  `room_id` varchar(50) DEFAULT NULL,
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
	(2,'Nuttapon.P','4','test','0000-00-00 00:00:00'),
	(3,'Nuttapon.P','4','test2','0000-00-00 00:00:00'),
	(4,'Nuttapon.P','4','test3','0000-00-00 00:00:00'),
	(5,'Vibhavee.T','4','message 1','0000-00-00 00:00:00'),
	(6,'Vibhavee.T','4','test','0000-00-00 00:00:00'),
	(7,'Vibhavee.T','4','test','0000-00-00 00:00:00'),
	(8,'Vibhavee.T','4','test','0000-00-00 00:00:00'),
	(9,'Vibhavee.T','4','hey','0000-00-00 00:00:00'),
	(10,'Vibhavee.T','4','te','0000-00-00 00:00:00'),
	(11,'Vibhavee.T','4','heyyyy','0000-00-00 00:00:00'),
	(12,'Vibhavee.T','4','hey','2014-01-21 17:42:06'),
	(13,'Vibhavee.T','4','test','2014-01-21 17:50:27'),
	(14,'Vibhavee.T','4','Hey','2014-01-21 17:52:42'),
	(15,'Nuttapon.P','4','Hi ya','2014-01-21 17:52:47'),
	(16,'Vibhavee.T','4','test','2014-01-21 17:53:53'),
	(17,'Vibhavee.T','4','test','2014-01-21 17:54:04'),
	(18,'Nuttapon.P','4','test','2014-01-21 17:57:12');

/*!40000 ALTER TABLE `msg` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table room
# ------------------------------------------------------------

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
  `room_id` varchar(50) NOT NULL,
  `room_name` varchar(100) NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;

INSERT INTO `room` (`room_id`, `room_name`)
VALUES
	('1','Kamol.K / Kankawin.K / Chanon.J / Panisa.S'),
	('10','Tayida.T / Thanatcha.L / Taweekiat.T'),
	('11','Pradinan.P / Siraphob R. / Theeruch K.'),
	('12','Pinhathai.L / Pakawin.M / Ekapop.V'),
	('13','Kanittha.T / Donn.T / Akkawat.L'),
	('14','Adsadawut.C / Anon.W / Ariyawat.C'),
	('15','Jamorn.S'),
	('16','Thanyaporn.Mak / Pachara.Pet/Sarin.D'),
	('17','Warot.V / Lattapon.J / Hasavee.W'),
	('18','Chanet.S / Chaowalit.L'),
	('19','Noppayut.S / Wichayut.E / Nawapat.M'),
	('2','Kasin.N / Kavin.J / Kanokporn.Pht'),
	('20','Nontawat.Ch / Pannavat.T / Sarin.A'),
	('21','Peeranut .L / Pongbhop.N / Auttarat.N'),
	('22','Yuranan.k / Poopah.J / Sittinut.J'),
	('23','Quanruthai.T/ Pongsathorn.P / Patcharawut.N'),
	('24','Kritsana.J / Kawin.W / Wongsagorn.Y'),
	('25','Panida.Ni/ Nasakol.P/ Peetikorn.J'),
	('26','Mondit.t / Matthanapol.K / Jit.L'),
	('27','Kritsada.Li / Thanarak.T'),
	('28','Kittipat S./ Pawarit S./ Chanavit A.'),
	('3','Thanakom.S/ Apitai.K/ /Kritsana.S'),
	('4','Nuttapon.P / Park.N / Vibhavee.T'),
	('5','Jiraphon.S / Pariyawit.J / Piyawat.L'),
	('6','Tawit.K/Supanuth.A/Suwapat.K'),
	('7','Krittaboon.T / Potsawee.V / Natchaya.L'),
	('8','Kulvaree.Ch / Watchara.Th / Nat.Um'),
	('9','Pirath K. / Thanakorn T. / Peerut B.');

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
  `room_id` varchar(50) NOT NULL,
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
	('Adsadawut.C','14',0),
	('Akkawat.L','13',0),
	('Anon.W','14',0),
	('Apitai.K','3',0),
	('Ariyawat.C','14',0),
	('Auttarat.N','21',0),
	('Chanavit.A','28',0),
	('Chanet.S','18',0),
	('Chanon.J','1',0),
	('Chaowalit.L','18',0),
	('Donn.T','13',0),
	('Ekapop.V','12',0),
	('Hasavee.W','17',0),
	('Jamorn.S','15',0),
	('Jiraphon.S','5',0),
	('Jit.L','26',0),
	('Kamol.K','1',0),
	('Kanittha.T','13',0),
	('Kankawin.K','1',0),
	('Kanokporn.Pht','2',0),
	('Kasin.N','2',0),
	('Kavin.J','2',0),
	('Kawin.W','24',0),
	('Kittipat.S','28',0),
	('Kritsada.Li','27',0),
	('Kritsana.J','24',0),
	('Kritsana.S','3',0),
	('Krittaboon.T','7',0),
	('Kulvaree.Ch','8',0),
	('Lattapon.J','17',0),
	('Matthanapol.K','26',0),
	('Mondit.t','26',0),
	('Nasakol.P','25',0),
	('Nat.Um','8',0),
	('Natchaya.L','7',0),
	('Nawapat.M','19',0),
	('Nontawat.Ch','20',0),
	('Noppayut.S','19',0),
	('Nuttapon.P','4',0),
	('Pachara.Pet','16',0),
	('Pakawin.M','12',0),
	('Panida.Ni','25',0),
	('Panisa.S','1',0),
	('Pannavat.T','20',0),
	('Pariyawit.J','5',0),
	('Park.N','4',0),
	('Patcharawut.N','23',0),
	('Pawarit.S','28',0),
	('Peeranut.L','21',0),
	('Peerut.B','9',0),
	('Peetikorn.J','25',0),
	('Pinhathai.L','12',0),
	('Pirath.K','9',0),
	('Piyawat.L','5',0),
	('Pongbhop.N','21',0),
	('Pongsathorn.P','23',0),
	('Poopah.J','22',0),
	('Potsawee.V','7',0),
	('Pradinan.P','11',0),
	('Quanruthai.T','23',0),
	('Sarin.A','20',0),
	('Sarin.D','16',0),
	('Siraphob.R','11',0),
	('Sittinut.J','22',0),
	('Supanuth.A','6',0),
	('Suwapat.K','6',0),
	('Taweekiat.T','10',0),
	('Tawit.K','6',0),
	('Tayida.T','10',0),
	('Thanakom.S','3',0),
	('Thanakorn.T','9',0),
	('Thanarak.T','27',0),
	('Thanatcha.L','10',0),
	('Thanyaporn.Mak','16',0),
	('Theeruch.K','11',0),
	('Vibhavee.T','4',0),
	('Warot.V','17',0),
	('Watchara.Th','8',0),
	('Wichayut.E','19',0),
	('Wongsagorn.Y','24',0),
	('Yuranan.k','22',0);

/*!40000 ALTER TABLE `userroom` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
