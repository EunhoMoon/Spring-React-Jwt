import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";

const AuthRoute = ({ isLogin, component: Component, render, ...rest }) => {
  useEffect(() => {
    console.log(
      "AuthRoute render path : " + rest.path + " isLogin : " + isLogin
    );
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Route
            element={
              <Navigate
                replace
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            }
          />
        )
      }
    />
  );
};

export default AuthRoute;
