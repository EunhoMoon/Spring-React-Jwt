# Spring-React-Jwt

### Springboot

- Springboot ^2.0
- Maven
- MyBatis
- MySQL/MariaDB
- Security
- jwt

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
```

### To Do Lists

- 회원 정보 수정 기능 구현
