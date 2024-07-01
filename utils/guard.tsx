import React, { FC, Fragment, ReactNode, useEffect, useMemo } from "react";
import Router, { useRouter } from "next/router";
import { IStore, setUser, store } from "store";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "antd";
import _ from "lodash";
import { Cookies, useCookies } from "react-cookie";
import { MAIN_TOKEN_NAME } from "../constants/tokenNames";
import { useGetMe } from "../hooks";
import env from "./env";

interface IPropsCheckComponent {
  permission?: string[];
  children?: ReactNode;
}

const withAuth = (WrappedComponent: any, permission?: string[]) => {
  const WithAuth = (props: any) => {
    const cookie = new Cookies();
    const router = useRouter();
    const dispatch = useDispatch();

    const [token] = useCookies([MAIN_TOKEN_NAME]);
    const user = useSelector(
      (state: IStore) =>
        state.user.user?.rbacAssignment?.rbacRole?.permissionList ?? []
    );

    const getMe = useGetMe({
      onSuccess: (data) => {
        dispatch(setUser({}));
        dispatch(
          setUser({
            ...data?.result,
          })
        );
        Router.push("/schedule");
      },
      onError: () => {},
    });

    const showNotAllowed = useMemo(() => {
      const a = permission ?? [];
      return a.length > 0 && _.intersection(a, user).length <= 0;
    }, []);

    useEffect(() => {
      if (!!router.asPath?.split("/?token=")[1]) {
        cookie.set(MAIN_TOKEN_NAME, router.asPath?.split("/?token=")[1]);
        getMe.mutate({});
      } else if (!token?.[MAIN_TOKEN_NAME]) {
        Router.push({
          pathname: env.login_url?.startsWith("http:")
            ? "/login"
            : env.login_url,
          query:
            Router.asPath !== "/"
              ? {
                  role: "staff",
                  redirect: Router.asPath,
                }
              : env.login_url?.startsWith("http:")
                ? {}
                : { role: "staff" },
        });
        store.dispatch(setUser(null));
      }
    }, [token]);

    if (!token?.[MAIN_TOKEN_NAME]) {
      return null;
    }

    return showNotAllowed ? (
      <Result title="You don't have permission to this page!" />
    ) : (
      <WrappedComponent {...props} />
    );
  };

  return WithAuth;
};

export default withAuth;

export const CheckPermission: FC<IPropsCheckComponent> = ({
  permission: userPermission,
  children,
}) => {
  const permissions = useSelector(
    (state: IStore) =>
      state.user.user?.rbacAssignment?.rbacRole?.permissionList ?? []
  );
  const showNotAllowed = useMemo(() => {
    const a = userPermission ?? [];
    return a.length > 0 && _.intersection(a, permissions).length <= 0;
  }, []);

  if (showNotAllowed) return null;

  return <Fragment>{children}</Fragment>;
};

export const funcCheckPermission = (userPermission: string[]): boolean => {
  const permissions =
    store.getState().user.user?.rbacAssignment?.rbacRole?.permissionList ?? [];
  const a = userPermission ?? [];
  let bool = _.intersection(a, permissions).length;
  return a.length > 0 && bool !== 0;
};
