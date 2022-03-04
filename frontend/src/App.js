import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import Counter from "./component/Counter";
import Header from "./component/Header";
import MyInfo from "./pages/user/MyInfo";
import InsetDividers from "./pages/test";
import NotFound from "./pages/error/NotFound";

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
          <Route path="/user/myInfo" element={<MyInfo />} />
          <Route path="/test" element={<InsetDividers isLogin={isLogin} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
