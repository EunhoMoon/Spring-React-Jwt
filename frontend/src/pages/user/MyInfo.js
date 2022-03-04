import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyInfo() {
  const [user, setUser] = React.useState({
    username: "",
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
          navigate("/login");
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
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="사용자 아이디" secondary={user.username} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </Container>
  );
}
