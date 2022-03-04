import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ isLogin }) => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    username: "",
    password: "",
  });

  const changeValue = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isLogin) {
      alert("잘못된 경로로 들어오셨습니다.");
      navigate(-1);
    }
    console.log("로그인 상태", isLogin);
  }, [isLogin]);

  const submitLogin = (e) => {
    e.preventDefault();
    axios
      .post("/login", JSON.stringify(user), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        const jwtToken = res.headers.authorization;
        sessionStorage.setItem("Authorization", jwtToken);
        alert("로그인 성공");
        console.log(res.headers);
        window.location.replace("/");
      })
      .catch((error) => {
        if (error.response.status == 401) {
          alert("회원 정보가 일치하지 않습니다.");
        } else if (error.response.status == 500) {
          alert("존재하지 않는 아이디입니다.");
        }
      });
  };

  return (
    <div className="container mt-2">
      <Form onSubmit={submitLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="아이디를 입력하세요."
            onChange={changeValue}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요."
            autoComplete="on"
            onChange={changeValue}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="m-1">
          Login
        </Button>
        <Link to={"/join"} type="submit" className="btn btn-primary m-1">
          Join
        </Link>
      </Form>
    </div>
  );
};

export default LoginPage;
