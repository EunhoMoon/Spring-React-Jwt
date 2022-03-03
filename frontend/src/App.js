import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import Counter from "./component/Counter";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {}, []);

  const loginCallBack = (login) => {
    setIsLogin(login);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login" element={<LoginPage />}/>
          <Route path="/counter" isLogin={isLogin} element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
