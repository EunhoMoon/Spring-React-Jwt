# Spring-React-Jwt

### Springboot

- Springboot ^2.0
- Maven
- MyBatis
- MySQL/MariaDB
- Security
- jwt
- logback
- log4jdbc

plugins

- frontend-maven-plugin
- maven-antrun-plugin

### React

- yarn add axios
- yarn add react-router-dom@5.2.0
- yarn add redux react-redux
- yarn add react-bootstrap bootstrap
- yarn add styled-components
- yarn add @mui/material @emotion/react @emotion/styled
- yarn add @mui/icons-material
- yarn add @mui/lab
- npm i @date-io/date-fns@1.x date-fns
- npm install --save @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic

```txt
import 'bootstrap/dist/css/bootstrap.min.css';
```

### DB 테이블 세팅

```sql
/* 회원 테이블 */
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(256) NOT NULL UNIQUE,
  password VARCHAR(256) NOT NULL,
  name VARCHAR(256) NOT NULL,
  email VARCHAR(256),
  roles VARCHAR(256) DEFAULT 'ROLE_USER',
  joinDate DATETIME DEFAULT NOW(),
  lastLogin DATETIME
);

/* 게시판 테이블 */
CREATE TABLE board (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  content VARCHAR(256) NOT NULL,
  writer VARCHAR(256) NOT NULL,
  writeDate DATETIME DEFAULT NOW(),
  readCnt INT DEFAULT 0,
  likeCnt INT DEFAULT 0,
  FOREIGN KEY (writer) REFERENCES user (username)
);

/* 게시판 좋아요 테이블 */
CREATE TABLE board_like (
  id INT NOT NULL,
  username VARCHAR(256) NOT NULL,
  FOREIGN KEY (id) REFERENCES board(id),
  FOREIGN KEY (username) REFERENCES user(username)
);

/* 댓글 테이블 */
CREATE TABLE reply (
  id INT AUTO_INCREMENT PRIMARY KEY,
  boardId INT,
  writer VARCHAR(256),
  content VARCHAR(500) NOT NULL,
  gnb INT DEFAULT 0,
  writeDate DATETIME DEFAULT NOW(),
  FOREIGN KEY (boardId) REFERENCES board(id),
  FOREIGN KEY (writer) REFERENCES user(username)
);

/* 댓글 삭제 프로시저 */
CREATE PROCEDURE `delete_board`(
	IN `boardId` INT,
	IN `username` VARCHAR(256)
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
  DECLARE exit handler for SQLEXCEPTION
    BEGIN
      ROLLBACK;
    END;
  START TRANSACTION;
    DELETE FROM boardlike WHERE id=boardid;
    DELETE FROM board WHERE id=boardid AND writer=username;
  COMMIT;
END

/* 댓글 좋아요 테이블 */
CREATE TABLE reply_like (
  id INT NOT NULL,
  username VARCHAR(256) NOT NULL,
  kind VARCHAR(4) NOT NULL,
  score INT NOT NULL,
  FOREIGN KEY (id) REFERENCES reply(id),
  FOREIGN KEY (username) REFERENCES user(username)
);

/* 게시글 좋아요 트리거 */
  /* 좋아요 생성시 */
  DELIMITER $$

  CREATE TRIGGER update_like
  AFTER UPDATE ON boardlike
  FOR EACH ROW
  BEGIN
    UPDATE board SET likeCnt = (likeCnt + 1) WHERE id = NEW.id;
  END $$

  DELIMITER ;

  /* 좋아요 삭제시 */
  DELIMITER $$

  CREATE TRIGGER delete_like
  AFTER DELETE ON boardlike
  FOR EACH ROW
  BEGIN
    UPDATE board SET likeCnt = (likeCnt - 1) WHERE id = OLD.id;
  END $$

  DELIMITER ;

/* 댓글 좋아요 트리거 */
  /* 좋아요 생성시 */
  DELIMITER $$

  CREATE TRIGGER update_reply_like
  AFTER UPDATE ON reply_like
  FOR EACH ROW
  BEGIN
    IF NEW.kind = 'good' THEN
      UPDATE reply SET good = (good + 1) WHERE id = new.id;
    ELSEIF NEW.kind = 'bad' THEN
      UPDATE reply SET bad = (bad + 1) WHERE id = new.id;
      END IF;
  END $$

  DELIMITER ;

  /* 좋아요 삭제시 */
  DELIMITER $$

  CREATE TRIGGER delete_reply_like
  AFTER DELETE ON reply_like
  FOR EACH ROW
  BEGIN
    IF OLD.kind = 'good' THEN
      UPDATE reply SET good = (good - 1) WHERE id = OLD.id;
    ELSEIF OLD.kind = 'bad' THEN
      UPDATE reply SET bad = (bad - 1) WHERE id = OLD.id;
      END IF;
  END $$

  DELIMITER ;
```

### To Do Lists

- 회원 정보 수정 기능 구현
