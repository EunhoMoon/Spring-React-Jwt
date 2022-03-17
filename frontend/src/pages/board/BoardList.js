import * as React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";

export default function BoardList() {
  const pNum = useParams().pNum;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [totalPage, setTotalPage] = React.useState();
  const [rows, setRows] = React.useState([]);
  const token = sessionStorage.getItem("Authorization");
  const searchs = [
    { key: "writer", value: "작성자" },
    { key: "title", value: "제목" },
    { key: "content", value: "내용" },
  ];
  const [search, setSearch] = React.useState("title");
  const [keyword, setKeyword] = React.useState("");
  const [query, setQuery] = React.useState({
    search: state === null ? "" : state.search,
    keyword: state === null ? "" : state.keyword,
    isOnly: state === null ? "n" : state.isOnly,
  });

  React.useEffect(() => {
    axios
      .get(
        "/api/getBoardList/" +
          pNum +
          "?search=" +
          query.search +
          "&keyword=" +
          query.keyword +
          "&isOnly=" +
          query.isOnly
      )
      .then((res) => {
        setRows(res.data.list);
        setTotalPage(res.data.pageSize);
      })
      .catch(() => {
        sessionStorage.clear();
        window.location.replace();
      });
  }, [pNum, query]);

  const handleBoardSearch = () => {
    setQuery({
      search: search,
      keyword: keyword,
    });
  };

  const handlePageChange = (event, value) => {
    navigate("/board/list/" + value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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
                <TableCell align="center">조회수</TableCell>
                <TableCell align="center">추천수</TableCell>
                <TableCell align="center">작성일</TableCell>
              </TableRow>
            </TableHead>

            {rows.length > 0 ? (
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
                    <TableCell align="center" width={"33%"}>
                      {row.new ? (
                        <FiberNewOutlinedIcon
                          fontSize="small"
                          color="warning"
                          sx={{ margin: 0 }}
                        />
                      ) : null}
                      &nbsp;
                      <Link
                        className="titleLink"
                        to={"/board/detail/" + row.id}
                      >
                        {row.title}
                      </Link>
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      {row.writer}
                    </TableCell>
                    <TableCell align="center" width={"12%"}>
                      {row.readCnt}
                    </TableCell>
                    <TableCell align="center" width={"12%"}>
                      {row.likeCnt}
                    </TableCell>
                    <TableCell align="center" width={"18%"}>
                      {row.writeDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={2}>
            <div style={{ marginTop: 15 }}>
              <FormControl fullWidth>
                <InputLabel id="label">검색조건</InputLabel>
                <Select
                  labelId="label"
                  id="demo-simple-select-standard"
                  value={search}
                  onChange={handleSearchChange}
                  size="small"
                  label="검색조건"
                >
                  {searchs.map((search) => (
                    <MenuItem key={"@" + search.key} value={search.key}>
                      {search.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={{ marginTop: 15 }}>
              <TextField
                id="outlined-basic"
                label="검색어"
                variant="outlined"
                size="small"
                onChange={handleKeywordChange}
                defaultValue={keyword}
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
              onClick={handleBoardSearch}
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
