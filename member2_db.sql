-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.4.8-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- member2 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `member2` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `member2`;

-- 테이블 member2.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) COLLATE utf8_bin NOT NULL,
  `content` varchar(256) COLLATE utf8_bin NOT NULL,
  `writer` varchar(256) COLLATE utf8_bin NOT NULL,
  `writeDate` datetime DEFAULT current_timestamp(),
  `readCnt` int(11) DEFAULT 0,
  `likeCnt` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `writer` (`writer`),
  CONSTRAINT `board_ibfk_1` FOREIGN KEY (`writer`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 테이블 데이터 member2.board:~30 rows (대략적) 내보내기
DELETE FROM `board`;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` (`id`, `title`, `content`, `writer`, `writeDate`, `readCnt`, `likeCnt`) VALUES
	(2, 'test2', 'test2', 'test2', '2022-03-08 13:20:49', 1, 1),
	(3, 'test3', 'test3', 'test', '2022-03-08 13:20:57', 1, 0),
	(5, 'test4', 'test4', 'test3', '2022-03-08 13:21:15', 1, 0),
	(6, 'test', 'test', 'test', '2022-03-08 17:19:31', 0, 0),
	(7, 'test', 'test', 'test', '2022-03-08 17:19:32', 0, 0),
	(8, 'test', 'test', 'test', '2022-03-08 17:19:33', 1, 0),
	(9, 'test', 'test', 'test', '2022-03-08 17:19:33', 0, 0),
	(10, 'test', 'test', 'test', '2022-03-08 17:19:33', 0, 1),
	(11, 'test', 'test', 'test', '2022-03-08 17:19:33', 0, 0),
	(12, 'test', 'test', 'test', '2022-03-08 17:19:33', 1, 0),
	(13, 'test', 'test', 'test', '2022-03-08 17:19:34', 1, 0),
	(14, 'test', 'test', 'test', '2022-03-08 17:19:34', 0, 0),
	(15, 'test', 'test', 'test', '2022-03-08 17:19:34', 0, 0),
	(16, 'test', 'test', 'test', '2022-03-08 17:19:34', 0, 0),
	(17, 'test', 'test', 'test', '2022-03-08 17:19:34', 1, 0),
	(18, 'test', 'test', 'test', '2022-03-08 17:19:34', 0, 0),
	(19, 'test', 'test', 'test', '2022-03-08 17:19:35', 2, 1),
	(20, 'test', 'test', 'test', '2022-03-08 17:19:35', 3, 1),
	(21, 'test', 'test', 'test', '2022-03-08 17:19:35', 0, 0),
	(23, 'test', 'test', 'test', '2022-03-08 17:19:35', 1, 1),
	(24, 'test', 'test', 'test', '2022-03-08 17:19:35', 1, 1),
	(25, 'test', 'test', 'test', '2022-03-08 17:19:36', 6, 2),
	(26, 'test', 'test', 'test', '2022-03-08 17:19:36', 10, 1),
	(27, 'test', 'test', 'test', '2022-03-08 17:19:36', 7, 1),
	(28, 'test', 'test', 'test', '2022-03-08 17:19:36', 11, 1),
	(29, 'test', 'test', 'test', '2022-03-08 17:19:36', 1, 1),
	(38, '글 쓰기', '<p>글 쓰기 테스트</p><p>&nbsp;</p><p>테테테테</p>', 'test2', '2022-03-11 10:50:53', 9, 3),
	(47, '카카오 글쓰기', '<p>카카오 로그인 후</p><p>글쓰기 테스트 중</p><p><strong>아주 잘 됩니다.</strong></p>', 'kakao_2162455744', '2022-03-17 10:48:22', 10, 2),
	(48, '카카오 글쓰기 2', '<p>카카오</p><p><i>글 쓰기 2</i></p><ul><li><i>카카오</i></li><li><i>카카카오</i></li></ul><figure class="table"><table><tbody><tr><td>테</td><td>테이블</td></tr><tr><td>1</td><td>2</td></tr></tbody></table></figure><ol><li>&nbsp;</li></ol>', 'kakao_2162455744', '2022-03-17 16:46:32', 5, 0),
	(49, 'ㅁㄴㅇㄻㄴㅇㄻㄹ', '<p>ㄴㅇㅀ</p><p>ㄴㅇㅀㄴㅇㅀ</p><p>ㄴㅇㅀㄴㅇㅀ</p><p>ㅇㄶㄴㅇㅀㄴㅇ</p><p>ㄴㅇㅀㄴㅇㅀ</p><p>ㄴㅇㅎㄴㅇㅀ</p><p>ㄴㅇㅎㄴㅇㅀ</p><p>ㄴㅇㅀㄴㅇㅀ</p><p>ㄴㅇㅎㄴㅇㅎㄴㅇ</p><p>ㅇㄶㄴㅇㅀㄴㅇㅎ</p><p>ㄴㅇㅎㄴㅇㅀㄴㅇㅀ</p><p>ㄴㅇㅀㄴㅇㅎㄴㅇ</p><p>ㅎㄴㅇㅀㄴㅇㅀ</p><p>ㄴㅇㅎㄹㄴㅇㅎ</p>', 'kakao_2162455744', '2022-03-17 16:47:45', 16, 2);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;

-- 테이블 member2.boardlike 구조 내보내기
CREATE TABLE IF NOT EXISTS `boardlike` (
  `id` int(11) NOT NULL,
  `username` varchar(256) COLLATE utf8_bin NOT NULL,
  KEY `id` (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 테이블 데이터 member2.boardlike:~19 rows (대략적) 내보내기
DELETE FROM `boardlike`;
/*!40000 ALTER TABLE `boardlike` DISABLE KEYS */;
INSERT INTO `boardlike` (`id`, `username`) VALUES
	(2, 'test'),
	(10, 'test'),
	(38, 'test'),
	(25, 'test'),
	(28, 'test'),
	(26, 'test'),
	(20, 'test'),
	(19, 'test'),
	(29, 'test'),
	(27, 'test'),
	(24, 'test'),
	(38, 'test2'),
	(38, 'kakao_2162455744'),
	(25, 'kakao_2162455744'),
	(23, 'kakao_2162455744'),
	(47, 'test3'),
	(47, 'test'),
	(49, 'test'),
	(49, 'kakao_2162455744');
/*!40000 ALTER TABLE `boardlike` ENABLE KEYS */;

-- 프로시저 member2.delete_board 구조 내보내기
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_board`(
	IN `idnum` INT,
	IN `username` VARCHAR(256)


)
BEGIN
	DECLARE exit handler for SQLEXCEPTION
	  BEGIN
		ROLLBACK;    
	END;

	START TRANSACTION;
		DELETE FROM boardlike WHERE id=idnum;
		
		DELETE FROM reply WHERE boardid=idnum;

		DELETE FROM board WHERE id=idnum AND writer=username;

	COMMIT;
END//
DELIMITER ;

-- 테이블 member2.reply 구조 내보내기
CREATE TABLE IF NOT EXISTS `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `boardId` int(11) DEFAULT NULL,
  `writer` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `content` varchar(500) COLLATE utf8_bin NOT NULL,
  `good` int(11) DEFAULT 0,
  `bad` int(11) DEFAULT 0,
  `writeDate` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `boardId` (`boardId`),
  KEY `writer` (`writer`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`boardId`) REFERENCES `board` (`id`),
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`writer`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 테이블 데이터 member2.reply:~3 rows (대략적) 내보내기
DELETE FROM `reply`;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` (`id`, `boardId`, `writer`, `content`, `good`, `bad`, `writeDate`) VALUES
	(11, 27, 'test', 'test', 0, 0, '2022-03-15 11:23:13'),
	(19, 47, 'kakao_2162455744', '댓글도 잘 써지네요', 0, 0, '2022-03-17 10:48:48'),
	(20, 47, 'test3', '오 신기하네요 ', 0, 0, '2022-03-17 13:15:46');
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;

-- 테이블 member2.reply_like 구조 내보내기
CREATE TABLE IF NOT EXISTS `reply_like` (
  `id` int(11) NOT NULL,
  `username` varchar(256) COLLATE utf8_bin NOT NULL,
  `kind` varchar(4) COLLATE utf8_bin NOT NULL,
  KEY `id` (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 테이블 데이터 member2.reply_like:~16 rows (대략적) 내보내기
DELETE FROM `reply_like`;
/*!40000 ALTER TABLE `reply_like` DISABLE KEYS */;
INSERT INTO `reply_like` (`id`, `username`, `kind`) VALUES
	(7, 'test', 'good'),
	(8, 'test', 'good'),
	(9, 'test', 'good'),
	(4, 'test', 'good'),
	(10, 'test2', 'good'),
	(5, 'test2', 'bad'),
	(8, 'test2', 'good'),
	(12, 'name', 'good'),
	(5, 'name', 'good'),
	(10, 'name', 'good'),
	(9, 'name', 'good'),
	(5, 'test', 'good'),
	(12, 'test', 'good'),
	(13, 'test', 'good'),
	(10, 'test', 'good'),
	(13, 'name', 'good');
/*!40000 ALTER TABLE `reply_like` ENABLE KEYS */;

-- 테이블 member2.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) COLLATE utf8_bin NOT NULL,
  `password` varchar(256) COLLATE utf8_bin NOT NULL,
  `name` varchar(256) COLLATE utf8_bin NOT NULL,
  `email` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `roles` varchar(256) COLLATE utf8_bin DEFAULT 'ROLE_USER',
  `joinDate` datetime DEFAULT current_timestamp(),
  `lastLogin` datetime DEFAULT NULL,
  `oauthId` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 테이블 데이터 member2.user:~12 rows (대략적) 내보내기
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `password`, `name`, `email`, `roles`, `joinDate`, `lastLogin`, `oauthId`) VALUES
	(1, 'test', '$2a$10$WoeEBTrNTv86l6VJ4LRtrenb0AIFpA7Yyk22Q5erFmDH4lyXphcWO', '홍길동', 'test@daum.net', 'ROLE_USER', '2022-03-07 09:09:59', '2022-03-18 09:43:29', NULL),
	(2, 'test2', '$2a$10$B4fMdfvQ0KrB9yXMw84L6.PCeZ3eg1jUGOeyT2jufffpKcbv6ad2W', '임꺽정', 'im@naver.com', 'ROLE_USER', '2022-03-07 09:09:59', '2022-03-16 13:28:00', NULL),
	(3, 'test3', '$2a$10$ocgERM4seuIeWN6rv0yP9uSKz8KdK/RG0Bk1ViFMAZDcgxgGdGCMe', '전우치', 'test3@naver.com', 'ROLE_USER', '2022-03-07 09:09:59', '2022-03-17 13:15:07', NULL),
	(4, 'ironman', '$2a$10$5Es1s2fn0ZhpzpW7k5o7qe4kU.HNU.5jv90NoWeI039SnjKSqzq3m', '토니 스타크', NULL, 'ROLE_USER', '2022-03-07 11:39:25', '2022-03-14 09:15:59', NULL),
	(7, 'test5', '$2a$10$1x3yF1J40IHymI/noA0WJOX/8RShnrOD.chXjZnqPF6cdFltdIK.O', '테오', 'test5@naver.com', 'ROLE_USER', '2022-03-07 11:51:45', '2022-03-07 11:51:52', NULL),
	(8, 'test6', '$2a$10$hEkBexpqmCGfGLunBK1URO.crRR4nAwsKUHo2ShT6rHy9PxYF0/s.', '테스트', '', 'ROLE_USER', '2022-03-07 14:19:11', NULL, NULL),
	(9, 'test99', '$2a$10$3zQDOIC/ScDrCXZmiYgIWezdXAXX6ey1pwBrHgeiFZbnKqwrr69se', '구구', '', 'ROLE_USER', '2022-03-07 15:02:56', '2022-03-16 13:33:32', NULL),
	(10, 'test8', '$2a$10$jPy7bbr9TlNyXyQSwEKz3.Jnmxga9MzKFf55NRgrwkkBVagiPCkRe', '테팔', '', 'ROLE_USER', '2022-03-07 15:56:16', '2022-03-07 15:56:39', NULL),
	(12, 'test9', '$2a$10$oWFcb6fnITl06Vr2OwiQeOtsgvhBWqeAkGuZHbqys2oz7uPApCLE6', '태구', '', 'ROLE_USER', '2022-03-07 15:58:16', NULL, NULL),
	(13, 'name', '$2a$10$hFe2r5EcTxXTDXCaDTo6PulD5zTV.TtAIyqpVkMvxCT.4IwlwavAW', '이름', '', 'ROLE_USER', '2022-03-11 15:32:27', '2022-03-15 16:26:42', NULL),
	(15, 'admin', '$2a$10$9moDfOvNIGeTfRFD/MaEautR3OAEE8TtZ.IGBpssvA3yQIfHuhMk.', '관리자', '', 'ROLE_ADMIN', '2022-03-16 09:30:53', '2022-03-18 09:18:47', NULL),
	(21, 'kakao_2162455744', '$2a$10$D.gUhKOOtMqAXqprJy8IL.rb3o3uXbIQZlHsgPbHuNP3gjg3dHyt.', '문은호', NULL, 'ROLE_USER', '2022-03-16 17:02:40', '2022-03-18 11:29:58', NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 트리거 member2.delete_like 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `delete_like` AFTER DELETE ON `boardlike` FOR EACH ROW BEGIN
    UPDATE board SET likeCnt = (likeCnt - 1) WHERE id = OLD.id;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 member2.delete_reply_like 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `delete_reply_like` AFTER DELETE ON `reply_like` FOR EACH ROW BEGIN
   IF OLD.kind = 'good' THEN
   	UPDATE reply SET good = (good - 1) WHERE id = OLD.id;
   ELSEIF OLD.kind = 'bad' THEN
   	UPDATE reply SET bad = (bad - 1) WHERE id = OLD.id;
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 member2.update_like 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_like` AFTER INSERT ON `boardlike` FOR EACH ROW BEGIN
    UPDATE board SET likeCnt = (likeCnt + 1) WHERE id = NEW.id;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 member2.update_reply_like 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_reply_like` AFTER INSERT ON `reply_like` FOR EACH ROW BEGIN
   IF NEW.kind = 'good' THEN
   	UPDATE reply SET good = (good + 1) WHERE id = new.id;
   ELSEIF NEW.kind = 'bad' THEN
   	UPDATE reply SET bad = (bad + 1) WHERE id = new.id;
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
