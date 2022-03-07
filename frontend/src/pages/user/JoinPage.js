import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { red, green, orange } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import axios from "axios";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const theme = createTheme();

export default function JoinPage() {
  const token = sessionStorage.getItem("Authorization");
  const navigate = useNavigate();
  const domains = ["google.com", "naver.com", "daum.net"];
  const [e2, setE2] = React.useState("");
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    name: "",
    e1: "",
  });
  const [buttonColor, setButtonColor] = React.useState("warning");
  const [buttonImage, setButtonImage] = React.useState(<QuestionMarkIcon />);
  const [checkDup, setCheckDup] = React.useState(false);
  const [checkPass, setCheckPass] = React.useState(false);
  const [passImg, setPassImg] = React.useState(
    <ErrorOutlineIcon sx={{ color: red[500] }} />
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setE2(value);
  };

  React.useEffect(() => {
    if (token !== null) {
      alert("잘못된 경로로 들어오셨습니다.");
      navigate(-1);
    }
  }, []);

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "username") {
      setCheckDup(false);
    }
  };

  const usernameDupCheck = (e) => {
    if (user.username !== null && user.username !== "") {
      axios
        .get("/api/findUsername/" + user.username)
        .then((res) => {
          if (res.data !== null && res.data !== "") {
            setButtonColor("error");
            setButtonImage(<ErrorOutlineIcon />);
          } else {
            setButtonColor("success");
            setButtonImage(<CheckCircleOutlineIcon />);
            setCheckDup(true);
          }
        })
        .catch((error) => {});
    } else {
      alert("아이디를 입력하세요.");
      setButtonColor("warning");
      setButtonImage(<QuestionMarkIcon />);
    }
  };

  const checkPassValue = (e) => {
    if (
      e.target.value !== null &&
      e.target.value !== "" &&
      e.target.value === user.password
    ) {
      setPassImg(<CheckCircleOutlineIcon sx={{ color: green[500] }} />);
      setCheckPass(true);
    } else {
      setPassImg(<ErrorOutlineIcon sx={{ color: red[500] }} />);
      setCheckPass(false);
    }
  };

  const chkValue = (value) => {
    if (value.username === null || value.username === "") {
      alert("아이디를 입력하세요.");
      return false;
    } else if (value.password === null || value.password === "") {
      alert("비밀번호를 입력하세요.");
      return false;
    } else if (value.name === null || value.name === "") {
      alert("이름을 입력하세요.");
      return false;
    } else if (!checkDup) {
      alert("아이디 중복확인을 해주세요.");
      setButtonColor("warning");
      setButtonImage(<QuestionMarkIcon />);
    } else if (!checkPass) {
      alert("비밀번호가 다릅니다.");
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailData =
      user.e1 === null || user.e1 === "" || e2 === null || e2 === ""
        ? ""
        : user.e1 + e2;
    const userData = {
      username: user.username,
      password: user.password,
      name: user.name,
      email: emailData,
    };
    if (chkValue(userData)) {
      axios
        .post("/api/join", JSON.stringify(userData), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            alert("회원가입이 완료되었습니다.");
            navigate("/login");
          }
        })
        .catch((error) => {
          alert("회원가입시 문제가 발생했습니다.\n잠시후 다시 시도해보세요.");
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
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  fullWidth
                  id="username"
                  label="아이디"
                  autoFocus
                  onChange={changeValue}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="outlined"
                  sx={{
                    minWidth: 86,
                    minHeight: 56,
                  }}
                  color={buttonColor}
                  onClick={usernameDupCheck}
                >
                  {buttonImage}
                </Button>
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
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password2"
                  label="비밀번호 확인"
                  type="password"
                  id="password2"
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
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="name"
                  label="이름"
                  autoFocus
                  required
                  onChange={changeValue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="이메일"
                  name="e1"
                  autoComplete="email"
                  onChange={changeValue}
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
                      <MenuItem value={""} key={"no choice"}>
                        선택 안함
                      </MenuItem>
                      {domains.map((domain) => (
                        <MenuItem value={domain} key={"@" + domain}>
                          {domain}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "#2E3B55" }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
