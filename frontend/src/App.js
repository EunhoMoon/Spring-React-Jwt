import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import Counter from "./component/Counter";
import Header from "./component/Header";
import MyInfo from "./pages/user/MyInfo";

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
          <Route path="/counter" isLogin={isLogin} element={<Counter />} />
          <Route path="/user/myInfo" element={<MyInfo isLogin={isLogin} />} />

          <Route path="/*" element={<h1>존재하지 않는 페이지입니다.</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
