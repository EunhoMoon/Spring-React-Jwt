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
import { orange } from "@mui/material/colors";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotAuth from "../error/NotAuth";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export default function UserList({ isAdmin }) {
  const pNum = useParams().pNum;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [totalPage, setTotalPage] = React.useState();
  const [rows, setRows] = React.useState([]);
  const token = sessionStorage.getItem("Authorization");
  axios.defaults.headers.common["Authorization"] = token;
  const searchs = [
    { key: "username", value: "아이디" },
    { key: "name", value: "이름" },
  ];
  const [search, setSearch] = React.useState("username");
  const [keyword, setKeyword] = React.useState("");
  const [query, setQuery] = React.useState({
    search: state === null ? "" : state.search,
    keyword: state === null ? "" : state.keyword,
    isOnly: state === null ? "n" : state.isOnly,
  });

  React.useEffect(() => {
    axios
      .get(
        "/api/admin/getUserList/" +
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
      });
  }, [pNum, query]);

  const handleBoardSearch = () => {
    setQuery({
      search: search,
      keyword: keyword,
    });
  };

  const handlePageChange = (event, value) => {
    navigate("/admin/user/list/" + value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Container>
      {isAdmin ? (
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: orange[300] }}>
            <SupervisorAccountIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원 목록
          </Typography>

          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">아이디</TableCell>
                  <TableCell align="center">이름</TableCell>
                  <TableCell align="center" width="25%">
                    가입일
                  </TableCell>
                  <TableCell align="center" width="25%">
                    마지막 로그인
                  </TableCell>
                </TableRow>
              </TableHead>

              {rows.length > 0 ? (
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Link
                          className="titleLink"
                          to={"/admin/user/info/" + row.username}
                        >
                          {row.username}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.joinDate}</TableCell>
                      <TableCell align="center">{row.lastLogin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
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
            <Grid item xs={12} sm={2}></Grid>
          </Grid>
          <Stack spacing={2} sx={{ marginTop: 3 }}>
            <Pagination
              count={totalPage}
              page={parseInt(pNum)}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      ) : (
        <NotAuth />
      )}
    </Container>
  );
}
