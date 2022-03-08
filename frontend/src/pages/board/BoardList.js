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
import { Avatar, Pagination, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Box } from "@mui/system";

export default function BoardList() {
  const pNum = useParams().pNum;
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = React.useState(); // 총 페이지 수
  const [rows, setRows] = React.useState([
    { id: "", num: "", title: "", writer: "", writeDate: "", likeCnt: "" },
  ]);
  console.log(pNum);
  React.useEffect(() => {
    axios.get("/api/getBoardList/" + pNum).then((res) => {
      setRows(res.data.list);
      const num = res.data.pageSize;
      const size = num % 10 > 0 ? num / 10 + 1 : num / 10;
      console.log(size);
      setTotalPage(size);
    });
  }, [pNum]);
  const [page, setPage] = React.useState(pNum);
  const handleChange = (event, value) => {
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
        <Avatar sx={{ m: 1, bgcolor: grey[500] }}>
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
        <Stack spacing={2} sx={{ marginTop: 3 }}>
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </Container>
  );
}
