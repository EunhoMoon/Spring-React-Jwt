import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import axios from "axios";

const ReplyItem = ({ reply, writer, token, reRender, setReRender }) => {
  const [gnb, setGnb] = useState(reply.gnb !== null ? reply.gnb : "n");

  const requestHandler = (frm) => {
    axios
      .post("/api/reply/updateReply/" + reply.reply.id, frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then()
      .catch(() => {
        alert("일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.");
      });
  };

  const gnbHandler = (e) => {
    const frm = new FormData();
    frm.append("kind", e);
    if (token !== null && token !== "") {
      if (gnb === "n") {
        frm.append("type", "up");
        requestHandler(frm);
        setGnb(e);
      } else {
        if (gnb === e) {
          frm.append("type", "del");
          requestHandler(frm);
          setGnb("n");
        } else {
          alert("이미 추천/비추천 하셨습니다.");
        }
      }
      setReRender(reRender + 1);
    } else {
      alert("로그인 후 이용하실 수 있습니다.");
    }
  };

  const setGood = () => {
    gnbHandler("good");
  };

  const setBad = () => {
    gnbHandler("bad");
  };

  const content = (
    <Box fullWidth>
      <Card
        elevation={2}
        style={{
          background: writer !== reply.reply.writer ? "white" : "#eeeefe",
        }}
      >
        <CardHeader
          action={
            <div style={{ marginRight: 10 }}>
              <IconButton aria-label="good" onClick={setGood} value="good">
                {reply.gnb === "good" ? (
                  <ThumbUpAltIcon fontSize="small" />
                ) : (
                  <ThumbUpOffAltIcon fontSize="small" />
                )}
              </IconButton>
              <span style={{ fontSize: "0.8em" }}>{reply.reply.good}</span>
              &nbsp;&nbsp;
              <IconButton aria-label="bad" onClick={setBad} value="bad">
                {reply.gnb === "bad" ? (
                  <ThumbDownAltIcon fontSize="small" />
                ) : (
                  <ThumbDownOffAltIcon fontSize="small" />
                )}
              </IconButton>
              <span style={{ fontSize: "0.8em" }}>{reply.reply.bad}</span>
            </div>
          }
          subheader={
            <div>
              <span>{reply.reply.writer}</span>&nbsp;&nbsp;
              <span style={{ fontSize: "0.7em" }}>
                {reply.reply.writeDate.substr(0, 16)}
              </span>
            </div>
          }
        />
        <CardContent style={{ marginTop: "-20px" }}>
          {reply.reply.content}
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 500 }} style={{ margin: "10px auto" }}>
      <Grid container spacing={2}>
        {writer !== reply.reply.writer ? (
          <Grid item xs={12} sm={11}>
            {content}
          </Grid>
        ) : (
          <Grid item xs={12} sm={1}></Grid>
        )}
        {writer !== reply.reply.writer ? (
          <Grid item xs={12} sm={1}></Grid>
        ) : (
          <Grid item xs={12} sm={11}>
            {content}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ReplyItem;
