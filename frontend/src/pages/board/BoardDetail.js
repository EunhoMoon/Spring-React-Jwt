import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Loading from "../error/Loading";
import InputForm from "../../component/InputForm";
import ReplyItem from "../../component/ReplyItem";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const BoardDetail = () => {
  const boardId = useParams().boardId;
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const token = sessionStorage.getItem("Authorization");
  const [isLike, setIsLike] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [replylist, setReplyList] = useState([]);
  const [reRender, setReRender] = useState(0);
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
        setReplyList(res.data.replyList);
      })
      .catch((error) => {
        sessionStorage.clear();
        window.location.replace();
      });
  }, [boardId, isLike, reRender]);

  useEffect(() => {
    axios.post("/api/updateReadCnt/" + boardId);
  }, [boardId]);

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
      {board.id !== undefined ? (
        <div>
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <Card sx={{ maxWidth: 500 }} style={{ margin: "30px auto" }}>
            <CardHeader
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
              subheader={
                <span style={{ fontSize: "0.8em" }}>
                  {"작성자 : " +
                    board.writer +
                    " | 조회수 : " +
                    board.readCnt +
                    " | 게시일 : " +
                    board.writeDate}
                </span>
              }
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: board.content }}
              ></Typography>
            </CardContent>
          </Card>
          <InputForm boardId={boardId} />
          {replylist.map((reply) => (
            <ReplyItem
              key={"@" + reply.reply.id + "@"}
              reply={reply}
              writer={board.writer}
              token={token}
              reRender={reRender}
              setReRender={setReRender}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default BoardDetail;
