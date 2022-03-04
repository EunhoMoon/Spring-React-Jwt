import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function LoginPage({ isLogin }) {
  const navigate = useNavigate();
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
    if (isLogin) {
      alert("잘못된 경로로 들어오셨습니다.");
      navigate(-1);
    }
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
            Sign in
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
