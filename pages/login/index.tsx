import React, { useEffect } from "react";
// import { Login } from "app";
import { useAuth } from "hooks";
import Router from "next/router";
import { Cookies } from "react-cookie";
import { Button, Result } from "antd";
import { IUserMe } from "types";
import { ROLE_DEFAULT_ROUTES } from "constants/role";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("app/login/home"));
const LoginPage = () => {
  const cookies = new Cookies();
  const [user]: [user: IUserMe] = useAuth();
  const handleReload = () => {
    window?.location?.reload();
  };

  useEffect(() => {
    if (!!user) {
      if (Router.query?.redirect) {
        Router.replace(`${Router?.query?.redirect as string}`);
      } else {
        ROLE_DEFAULT_ROUTES.map((e) => {
          if (user.default_route == +e.value) {
            Router.push(e.url);
          }
        });
      }
    }
  }, [user]);

  if (!!user) {
    return null;
  }
  if (cookies.get("token"))
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={() => handleReload()}>
            Reload
          </Button>
        }
      />
    );
  return <Login />;
};

export default LoginPage;
