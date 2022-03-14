import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import Header from "./component/Header";
import MyInfo from "./pages/user/MyInfo";
import InsetDividers from "./pages/test";
import NotFound from "./pages/error/NotFound";
import JoinPage from "./pages/user/JoinPage";
import UpdatePass from "./pages/user/UpdatePass";
import Calendar from "./pages/service/Calendar";
import BoardList from "./pages/board/BoardList";
import BoardDetail from "./pages/board/BoardDetail";
import BoardWrite from "./pages/board/BoardWrite";
import Loading from "./pages/error/Loading";
import UpdateUserInfo from "./pages/user/UpdateUserInfo";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("Authorization") !== null) {
      setIsLogin(true);
    }
  }, []);
  console.log(isLogin);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage isLogin={isLogin} />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/user/myInfo" element={<MyInfo />} />
          <Route path="/user/updatePass" element={<UpdatePass />} />
          <Route path="/test" element={<InsetDividers isLogin={isLogin} />} />
          <Route path="/board/list/:pNum" element={<BoardList />} />
          <Route path="/board/write/" element={<BoardWrite />} />
          <Route path="/board/detail/:boardId" element={<BoardDetail />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/user/updateInfo" element={<UpdateUserInfo />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
