import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyInfo = ({ isLogin }) => {
  const [user, setUser] = useState({
    username: "",
  });
  const navigate = useNavigate();
  axios.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("Authorization");

  useEffect(() => {
    if (!isLogin) {
      alert("잘못된 경로로 들어오셨습니다.");
      navigate(-1);
    }

    axios
      .post("/api/user/info")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          alert("회원 정보가 일치하지 않습니다.");
        } else if (error.response.status == 500) {
          alert("존재하지 않는 아이디입니다.");
        }
      });
  }, []);

  return (
    <Container>
      <h3>회원 정보</h3>
      <ListGroup className="container">
        <ListGroup.Item>사용자 아이디 : {user.username}</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default MyInfo;
