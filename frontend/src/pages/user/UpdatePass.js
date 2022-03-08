import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { red, green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputAdornment } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const theme = createTheme();

export default function UpdatePass() {
  const token = sessionStorage.getItem("Authorization");
  const navigate = useNavigate();
  axios.defaults.headers.common["Authorization"] = token;
  const [user, setUser] = React.useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  const [checkPass, setCheckPass] = React.useState(false);
  const [passImg, setPassImg] = React.useState(
    <ErrorOutlineIcon sx={{ color: red[500] }} />
  );

  React.useEffect(() => {
    if (token === null) {
      alert("잘못된 경로로 들어오셨습니다.");
      navigate(-1);
    }
  });

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const checkPassValue = (e) => {
    if (
      e.target.value !== null &&
      e.target.value !== "" &&
      e.target.value === user.newPassword
    ) {
      setPassImg(<CheckCircleOutlinedIcon sx={{ color: green[500] }} />);
      setCheckPass(true);
    } else {
      setPassImg(<ErrorOutlineIcon sx={{ color: red[500] }} />);
      setCheckPass(false);
    }
  };

  const chkValue = (value) => {
    if (value.newPassword === null || value.newPassword === "") {
      alert("변경할 비밀번호를 입력하세요.");
      return false;
    } else if (value.oldPassword === null || value.oldPassword === "") {
      alert("기존 비밀번호를 입력하세요.");
    } else if (value.oldPassword === value.newPassword) {
      alert("기존 암호와 다른 암호만 변경 가능합니다.");
    } else if (!checkPass) {
      alert("비밀번호 확인을 확인하세요.");
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (chkValue(user)) {
      const frm = new FormData();
      frm.append("oldPass", user.oldPassword);
      frm.append("newPass", user.newPassword);

      axios
        .post("/api/user/chkUserPass", frm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data === 1) {
            axios
              .post("/api/user/updatePass", frm, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  alert(
                    "비밀번호 변경이 완료되었습니다. \n다시 로그인 해주세요."
                  );
                  sessionStorage.clear();
                  navigate("/login");
                }
              })
              .catch((error) => {
                alert(
                  "비밀번호 변경시 문제가 발생했습니다.\n잠시후 다시 시도해보세요."
                );
              });
          } else {
            alert("기존 암호를 확인해주세요.");
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            alert("다시 로그인 해주세요.");
            sessionStorage.clear();
            window.location.replace("/login");
          }
        });
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
          <Avatar sx={{ m: 1, bgcolor: green[500] }}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            비밀번호 변경
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="oldPassword"
                  label="기존 비밀번호"
                  type="password"
                  id="oldPassword"
                  autoComplete="new-password"
                  onChange={changeValue}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="newPassword"
                  label="비밀번호"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  onChange={changeValue}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="newPassword2"
                  label="비밀번호 확인"
                  type="password"
                  id="newPassword2"
                  autoComplete="new-password"
                  onChange={checkPassValue}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">{passImg}</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "#2E3B55" }}
            >
              비밀번호 변경
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
