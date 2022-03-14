import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const ReplyItem = ({ reply, writer }) => {
  const content = (
    <Box fullWidth>
      <Card
        elevation={2}
        style={{ background: writer !== reply.writer ? "white" : "#eeeefe" }}
      >
        <CardHeader
          action={
            <div style={{ marginRight: 10 }}>
              <IconButton aria-label="good">
                <ThumbUpOffAltIcon fontSize="small" />
              </IconButton>
              <span style={{ fontSize: "0.8em" }}>{reply.good}</span>
              &nbsp;&nbsp;
              <IconButton aria-label="bad">
                <ThumbDownOffAltIcon fontSize="small" />
              </IconButton>
              <span style={{ fontSize: "0.8em" }}>{reply.good}</span>
            </div>
          }
          subheader={
            <div>
              <span>{reply.writer}</span>&nbsp;&nbsp;
              <span style={{ fontSize: "0.7em" }}>
                {reply.writeDate.substr(0, 16)}
              </span>
            </div>
          }
        />
        <CardContent style={{ marginTop: "-20px" }}>
          {reply.content}
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 500 }} style={{ margin: "10px auto" }}>
      <Grid container spacing={2}>
        {writer !== reply.writer ? (
          <Grid item xs={12} sm={11}>
            {content}
          </Grid>
        ) : (
          <Grid item xs={12} sm={1}></Grid>
        )}
        {writer !== reply.writer ? (
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
