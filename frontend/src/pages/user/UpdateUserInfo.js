import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function UpdateUserInfo() {
  const token = sessionStorage.getItem("Authorization");
  const navigate = useNavigate();
  const email = useLocation().state.email.split("@");
  axios.defaults.headers.common["Authorization"] = token;
  const [user, setUser] = useState({
    password: "",
    e1: email[0],
  });
  const domains = ["gmail.com", "naver.com", "daum.net"];
  const [e2, setE2] = React.useState(email[1]);

  React.useEffect(() => {
    if (token === null) {
      alert("잘못된 경로로 들어오셨습니다.");
      navigate(-1);
    }
  }, [token]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setE2(value);
  };

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const chkValue = (value) => {
    if (value.password === null || value.password === "") {
      alert("비밀번호를 입력하세요.");
      return false;
    } else if (value.e1 === null || value.e1 === "") {
      alert("이메일을 입력하세요.");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailData =
      user.e1 === null || user.e1 === "" || e2 === null || e2 === ""
        ? ""
        : user.e1 + "@" + e2;
    if (chkValue(user)) {
      const frm = new FormData();
      frm.append("email", emailData);
      frm.append("password", user.password);
      axios
        .post("/api/user/updateUser", frm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data === 1) {
            alert("정보 수정이 완료되었습니다.");
            navigate("/user/myInfo");
          } else if (res.data === 0) {
            alert("비밀 번호가 일치하지 않습니다.");
          }
        })
        .catch((error) => {
          alert(
            "회원정보 수정시 문제가 발생했습니다.\n잠시후 다시 시도해보세요."
          );
        });
    } else {
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원정보 수정
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="e1"
                  autoComplete="email"
                  label="이메일"
                  onChange={changeValue}
                  defaultValue={user.e1}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <AlternateEmailIcon sx={{ mt: 2, ml: -0.5 }} />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      도메인
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={e2}
                      label="도메인"
                      onChange={handleChange}
                    >
                      {domains.map((domain) => (
                        <MenuItem value={domain} key={"@" + domain}>
                          {domain}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={changeValue}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, background: "#2E3B55" }}
                >
                  정보수정
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, background: "#2E3B55" }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  취 소
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
