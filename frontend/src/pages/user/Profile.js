import axios from "axios";
import React, { useEffect } from "react";
import Loading from "../error/Loading";

const Profile = () => {
  const login = (username) => {
    axios
      .post(
        "/login",
        JSON.stringify({
          username: username,
          password: "oauth",
        }),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const jwtToken = res.headers.authorization;
        sessionStorage.setItem("Authorization", jwtToken);
        alert("로그인 성공");
        window.location.replace("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("회원 정보가 일치하지 않습니다.");
        } else if (error.response.status === 500) {
          alert("존재하지 않는 아이디입니다.");
        }
      });
  };
  const oauthLogin = (username, account_email, name) => {
    axios
      .get("/api/findUsername/" + username)
      .then((res) => {
        if (res.data !== null && res.data !== "") {
          login(username);
        } else {
          console.log("username", username);
          console.log("name", name);
          console.log("email", account_email);
          axios
            .post(
              "/api/join",
              JSON.stringify({
                username: username,
                password: "oauth",
                name: name,
                email: account_email,
              }),
              {
                headers: {
                  "Content-Type": `application/json`,
                },
              }
            )
            .then((res) => {
              if (res.status === 201) {
                login(username);
              }
            })
            .catch((error) => {
              alert(
                "회원가입시 문제가 발생했습니다.\n잠시후 다시 시도해보세요."
              );
            });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("회원 정보가 일치하지 않습니다.");
        } else if (error.response.status === 500) {
          alert("존재하지 않는 아이디입니다.");
        }
      });
  };

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      oauthLogin(
        "kakao_" + data.id,
        data.properties.account_email,
        data.properties.nickname
      );
      console.log(data.properties);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return <Loading />;
};
export default Profile;
