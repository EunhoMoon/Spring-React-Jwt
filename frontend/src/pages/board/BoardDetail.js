import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Loading from "../error/Loading";

const BoardDetail = () => {
  const boardId = useParams().boardId;
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const token = sessionStorage.getItem("Authorization");
  const [isLike, setIsLike] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  token !== null && token !== ""
    ? (axios.defaults.headers.common["Authorization"] = token)
    : (axios.defaults.headers.common["Authorization"] = "");

  useEffect(() => {
    axios
      .get("/api/getBoardItem/" + boardId)
      .then((res) => {
        setBoard(res.data.board);
        setIsLike(res.data.isLike);
        setIsWriter(res.data.isWriter);
      })
      .catch((error) => {
        sessionStorage.clear();
        window.location.replace();
      });
  }, [boardId, isLike]);

  const setLike = () => {
    if (token === null || token === "") {
      alert("로그인 후 이용해주세요.");
    } else {
      if (isLike) {
        axios.delete("/api/setLike/" + boardId).then((res) => {
          if (res.status === 200) {
            setIsLike(false);
          } else {
            alert("일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.");
          }
        });
      } else {
        axios.post("/api/setLike/" + boardId).then((res) => {
          if (res.status === 200) {
            setIsLike(true);
          } else {
            alert("일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.");
          }
        });
      }
    }
  };

  const deleteBoard = () => {
    let isDel = window.confirm("정말 삭제하시겠습니까?");
    if (isDel) {
      axios.post("/api/deleteBoard/" + boardId).then((res) => {
        if (res.status === 200) {
          alert("삭제가 완료되었습니다.");
          navigate("/board/list/1");
        } else {
          alert("일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.");
        }
      });
    }
  };

  return (
    <div>
      {board !== {} ? (
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
                {isWriter ? (
                  <IconButton aria-label="delete" onClick={deleteBoard}>
                    <DeleteForeverIcon />
                  </IconButton>
                ) : null}
                &nbsp;
                <span style={{ marginTop: 3 }}>{board.likeCnt}</span>
                <IconButton aria-label="add to favorites" onClick={setLike}>
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default BoardDetail;
