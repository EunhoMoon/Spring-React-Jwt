import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Kakao from "../../images/kakao_login_medium_narrow.png";
import { Image } from "react-bootstrap";

const theme = createTheme();

// 카카오 로그인을 위한 값
const REST_API_KEY = "2e3417b542226dd863a9f1be84a1daff";
const REDIRECT_URI = "http://localhost:4200/oauth/kakao/callback";

export default function LoginPage() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Authorization");
  const [user, setuser] = React.useState({
    username: "",
    password: "",
  });

  const changeValue = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (token !== null && token !== "") {
      alert("잘못된 경로로 들어오셨습니다.");
      navigate(-1);
    }
  });

  const kakaoLogin = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=" +
      REST_API_KEY +
      "&redirect_uri=" +
      REDIRECT_URI +
      "&response_type=code";
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
        console.log(res);
        const jwtToken = res.headers.authorization;
        sessionStorage.setItem("Authorization", jwtToken);
        alert("로그인 성공");
        window.location.replace("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("회원 정보가 일치하지 않습니다.");
        } else if (error.response.status === 500) {
          alert("존재하지 않는 아이디입니다.");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={submitLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="아이디"
              name="username"
              placeholder="아이디를 입력하세요."
              onChange={changeValue}
              autoFocus
              autoComplete="current-username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="비밀번호를 입력하세요."
              onChange={changeValue}
              label="비밀번호"
              type="password"
              name="password"
              autoComplete="current-password"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ background: "#2E3B55", height: 43 }}
                >
                  로그인하기
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button sx={{ mt: 2, mb: 2 }} fullWidth onClick={kakaoLogin}>
                  <Image src={Kakao} />
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/join" variant="body2">
                  회원 가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
