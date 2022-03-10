import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const BoardDetail = () => {
  const boardId = useParams().boardId;
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const token = sessionStorage.getItem("Authorization");
  const [username, setUsername] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [likeList, setLikeList] = useState([]);
  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    axios.get("/api/getBoardItem/" + boardId).then((res) => {
      setBoard(res.data.board);
      setLikeList(res.data.boardLike);
    });

    if (token !== null) {
      axios.post("/api/user/info").then((res) => {
        setUsername(res.data.user.username);

        for (let i = 0; i < likeList.length; i++) {
          if (isLike === false && likeList[i].username === username) {
            setIsLike(true);
            break;
          }
        }
      });
    }
  }, [likeList]);

  return (
    <Card sx={{ maxWidth: 500 }} style={{ margin: "30px auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
            <ReplyIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </Avatar>
        }
        action={
          <div style={{ marginRight: 10 }}>
            {username === board.writer ? (
              <IconButton aria-label="delete">
                <DeleteForeverIcon />
              </IconButton>
            ) : null}
            &nbsp;
            <span style={{ marginTop: 3 }}>{board.likeCnt}</span>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color={isLike ? "error" : ""} />
            </IconButton>
          </div>
        }
        title={board.title}
        subheader={board.writer + "  " + board.writeDate}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: board.content }}
        ></Typography>
      </CardContent>
    </Card>
  );
};

export default BoardDetail;
