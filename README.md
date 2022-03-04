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

```txt
import 'bootstrap/dist/css/bootstrap.min.css';
```

### DB 테이블 세팅

```sql
/* 회원 테이블 */
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(256) NOT NULL,
  password VARCHAR(256) NOT NULL,
  roles  VARCHAR(256) DEFAULT 'ROLE_USER'
);

```

### To Do Lists

- 회원 테이블 수정
- 회원 정보 수정 기능 구현
