import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = (props) => {
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

  const submitLogin = (e) => {
    e.preventDefault();
    axios
      .post("/login", JSON.stringify(user), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res.headers.authorization);
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

        {/* Open Api Login */}
        <Button variant="primary" type="submit" className="m-1">
          카카오 로그인
        </Button>
        <Button variant="primary" type="submit" className="m-1">
          구글 로그인
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
