import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import auth from "api/auth";
import { changeCallServer, IStore, setIsLoadingUser, setUser } from "store";
import { usePageData } from "hooks";
import { useCookies } from "react-cookie";
import { MAIN_TOKEN_NAME } from "constants/tokenNames";
import env from "utils/env";

const UserGlobal = () => {
  const dispatch = useDispatch();
  const [_] = useCookies([MAIN_TOKEN_NAME]);
  const user = useSelector((state: IStore) => state.user.user);
  const logOut = useSelector((state: IStore) => state.user.logOut);
  const { isLoading, data } = useQuery(["user", _], () => auth.getMe(), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    enabled: !!_?.[MAIN_TOKEN_NAME],
  });

  // const connectionConfig = useSelector(
  //   (state: IStore) => state.sip.connectionConfig
  // );

  usePageData(!!_?.[MAIN_TOKEN_NAME]);

  useEffect(() => {
    dispatch(setIsLoadingUser(!_?.[MAIN_TOKEN_NAME] ? false : isLoading));
    if (!logOut) {
      if (!isLoading && !!_?.[MAIN_TOKEN_NAME] && data?.data?.ok)
        dispatch(setUser(data.data?.result));
      if (data?.data?.result.operator) {
        const operator = data?.data?.result.operator;
        dispatch(
          changeCallServer({
            server: env.pbxUrl,
            user: `${operator?.operator_number}`,
            password: operator?.sip_password.slice(4),
          })
        );
      }
    }
  }, [isLoading, user, _, logOut]);
  return null;
};

export default UserGlobal;
