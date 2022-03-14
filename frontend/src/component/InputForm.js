import { Button, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InputForm = ({ boardId }) => {
  const [content, setContent] = useState();
  const token = sessionStorage.getItem("Authorization");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setContent(e.target.value);
  };

  const submitReply = () => {
    if (token === null || token === "") {
      alert("로그인 후 댓글을 남길 수 있습니다.");
    } else {
      axios.defaults.headers.common["Authorization"] = token;
      if (content === "" || content === null) {
        alert("댓글 내용을 입력하세요.");
      } else {
        const frm = new FormData();
        frm.append("content", content);

        axios
          .post("/api/board/insertReply/" + boardId, frm, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data === 1) {
              alert("댓글 등록에 성공하였습니다.");
              window.location.replace("/board/detail/" + boardId);
            } else {
              alert("댓글 등록에 실패하였습니다.");
            }
          })
          .catch((error) => {
            alert(
              "서버와의 연결에 실패하였습니다.\n잠시 후 다시 시도해주세요."
            );
          });
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 500 }} style={{ margin: "30px auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10}>
          <TextField
            fullWidth
            label="댓글을 입력하세요."
            name="content"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              minHeight: 56,
              background: "#2E3B55",
            }}
            onClick={submitReply}
          >
            등록
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputForm;
