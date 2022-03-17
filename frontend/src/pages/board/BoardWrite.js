import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = token;

  const submitBoard = () => {
    if (title === "") {
      alert("글 제목을 입력하세요.");
    } else if (content === "") {
      alert("글 내용을 입력하세요.");
    } else {
      const frm = new FormData();
      frm.append("title", title);
      frm.append("content", content);

      axios
        .post("/api/board/insertBoard", frm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 201) {
            alert("글 작성에 성공하였습니다.");
            navigate("/board/list/1");
          } else {
            alert("글 작성에 실패하였습니다.");
          }
        })
        .catch((error) => {
          alert("서버와의 연결에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
        });
    }
  };

  return (
    <Card
      sx={{ maxWidth: 500, minHeight: 500 }}
      style={{ margin: "30px auto" }}
    >
      <div
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 16,
        }}
      >
        <TextField
          fullWidth
          label="제목을 입력하세요."
          id="fullWidth"
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(title);
          }}
        />
      </div>
      <CardContent>
        <CKEditor
          editor={ClassicEditor}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              variant="contained"
              name="updateInfo"
              sx={{
                mt: 2,
                background: "#2E3B55",
                width: "100%",
              }}
              onClick={submitBoard}
            >
              글 등록
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              variant="contained"
              name="updatePass"
              sx={{
                mt: 2,
                background: "#2E3B55",
                width: "100%",
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              취소
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default BoardWrite;
