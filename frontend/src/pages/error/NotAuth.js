import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import errorimage from "../../images/errorPage.jpg";

export default function NotAuth() {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 500 }} style={{ margin: "30px auto" }}>
      <CardMedia
        component="img"
        alt="404 page not found"
        height="410"
        image={errorimage}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontFamily: "CookieRun" }}
        >
          Do Not Have Permission
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontFamily: "D2Coding" }}
        >
          해당 페이지는 접근 권한이 없습니다.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </Button>
        <Button
          size="small"
          onClick={() => {
            navigate("/");
          }}
        >
          메인페이지로
        </Button>
      </CardActions>
    </Card>
  );
}
