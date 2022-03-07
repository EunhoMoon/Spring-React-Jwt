import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EmailIcon from "@mui/icons-material/Email";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyInfo() {
  const [user, setUser] = React.useState({
    username: "",
    name: "",
    email: "",
    joinDate: "",
  });
  const token = sessionStorage.getItem("Authorization");
  const navigate = useNavigate();
  axios.defaults.headers.common["Authorization"] = token;

  React.useEffect(() => {
    if (token === null || token === "") {
      alert("잘못된 경로로 들어오셨습니다.");
      navigate(-1);
    }

    axios
      .post("/api/user/info")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("다시 로그인 해주세요.");
          sessionStorage.clear();
          window.location.replace("/login");
        }
      });
  }, []);

  return (
    <Container>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        style={{ margin: "10px auto" }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountBoxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="아이디" secondary={user.username} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountBoxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="이름" secondary={user.name} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="이메일"
            secondary={
              user.email === null || user.email === "" ? "-" : user.email
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DateRangeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="가입일" secondary={user.joinDate} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </Container>
  );
}
