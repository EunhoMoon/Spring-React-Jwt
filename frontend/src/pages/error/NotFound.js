import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import errorimage from "../../images/404-error.jpg";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "30px auto" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={errorimage}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontFamily: "CookieRun" }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontFamily: "D2Coding" }}
        >
          해당 페이지는 존재하지 않는 페이지입니다.
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
