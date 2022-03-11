import * as React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import {
  Avatar,
  Button,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

export default function BoardList() {
  const pNum = useParams().pNum;
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = React.useState();
  const [rows, setRows] = React.useState([]);
  const token = sessionStorage.getItem("Authorization");

  React.useEffect(() => {
    axios.get("/api/getBoardList/" + pNum).then((res) => {
      setRows(res.data.list);
      setTotalPage(res.data.pageSize);
    });
  }, [pNum]);

  const handlePageChange = (event, value) => {
    navigate("/board/list/" + value);
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: grey }}>
          <ChatBubbleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          게시판
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작성자</TableCell>
                <TableCell align="center">추천수</TableCell>
                <TableCell align="center">작성일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    width={"10%"}
                  >
                    {row.num}
                  </TableCell>
                  <TableCell align="center" width={"35%"}>
                    <Link className="titleLink" to={"/board/detail/" + row.id}>
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center" width={"20%"}>
                    {row.writer}
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    {row.likeCnt}
                  </TableCell>
                  <TableCell align="center" width={"20%"}>
                    {row.writeDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={4}>
            <div style={{ marginTop: 15 }}>
              <TextField
                id="outlined-basic"
                label="검색어"
                variant="outlined"
                size="small"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              type="button"
              variant="contained"
              sx={{
                background: "#2E3B55",
                mt: 2,
                width: "100%",
              }}
              startIcon={<SearchIcon />}
            >
              검색
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              type="button"
              variant="contained"
              sx={{
                mt: 2,
                background: "#2E3B55",
                width: "100%",
              }}
              onClick={() =>
                token === null || token === ""
                  ? alert("회원만 글을 쓸 수 있습니다.\n가입 후 이용해주세요.")
                  : navigate("/board/write")
              }
            >
              글쓰기
            </Button>
          </Grid>
        </Grid>
        <Stack spacing={2} sx={{ marginTop: 3 }}>
          <Pagination
            count={totalPage}
            page={parseInt(pNum)}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </Container>
  );
}