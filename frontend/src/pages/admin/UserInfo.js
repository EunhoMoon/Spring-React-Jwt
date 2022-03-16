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
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Box,
  Collapse,
  Grid,
  Button,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function UserInfo() {
  const username = useParams().username;
  const [user, setUser] = React.useState({
    username: "",
    name: "",
    email: "",
    joinDate: "",
  });
  const [userContents, setUserContents] = React.useState([]);
  const token = sessionStorage.getItem("Authorization");
  const navigate = useNavigate();
  axios.defaults.headers.common["Authorization"] = token;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    axios
      .get("/api/admin/getUserInfo/" + username)
      .then((res) => {
        setUser(res.data.user);
        setUserContents(res.data.userContents);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("다시 로그인 해주세요.");
          sessionStorage.clear();
          window.location.replace("/login");
        }
      });
  }, []);

  const backToList = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          회원 정보
        </Typography>
      </Box>
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
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
              <AssignmentIcon />
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
              user.email === null || user.email === ""
                ? "이메일 정보 없음"
                : user.email
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
        <ListItemButton onClick={handleClick}>
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="작성 게시물" secondary="최근 10개 게시물" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {userContents.map((content) => (
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() =>
                  navigate("/board/detail/" + parseInt(content.id))
                }
                key={"@" + content.id}
              >
                <ListItemIcon></ListItemIcon>
                <Grid container>
                  <Grid item xs={12} sm={8}>
                    <ListItemText primary={content.title} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ListItemText primary={content.writeDate} />
                  </Grid>
                </Grid>
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() =>
                navigate("/board/list/1", {
                  state: {
                    search: "writer",
                    keyword: user.username,
                    isOnly: "y",
                  },
                })
              }
            >
              <ListItemIcon></ListItemIcon>
              <Grid container>
                <Grid item xs={12} sm={8}></Grid>
                <Grid item xs={12} sm={4} textAlign="right">
                  <ListItemText secondary="더보기..." />
                </Grid>
              </Grid>
            </ListItemButton>
          </List>
          <Divider variant="inset" component="li" />
        </Collapse>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}></Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="button"
              variant="contained"
              name="backToList"
              onClick={backToList}
              sx={{
                mt: 3,
                mb: 2,
                ml: 1.5,
                background: "#2E3B55",
                width: "100%",
              }}
            >
              목록으로
            </Button>
          </Grid>
        </Grid>
      </List>
    </Container>
  );
}
