import { useMemo } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { IStore } from "store";
import moment from "moment";
import { MAIN_TOKEN_NAME } from "constants/tokenNames";

export const useAuth = (): any => {
  const [_, setCookie, removeToken] = useCookies([MAIN_TOKEN_NAME]);
  const user = useSelector((state: IStore) => state.user.user);
  return useMemo(() => {
    const date = moment().add(8, "hours").toDate();
    return [
      user,
      (token: string) =>
        setCookie(MAIN_TOKEN_NAME, token, { expires: date, path: "/" }),
      removeToken,
    ];
  }, [user]);
};
