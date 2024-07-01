import axios from "axios";
import { resetModals, setLogOut, setUser, store } from "store";
import { LAST_ACTION_TIME_NAME, MAIN_TOKEN_NAME } from "constants/tokenNames";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
// import { logoutEveryNTimeWhenNoAction } from "utils/functions/logoutEveryNTimeWhenNoAction";

export const MainApi = "/api";

const instance = axios.create({
  baseURL: `${MainApi}/`,
});

const logOut = () => {
  toast.dismiss();
  try {
    Cookies.remove(MAIN_TOKEN_NAME);
    Cookies.remove(LAST_ACTION_TIME_NAME);
  } catch (e) {}
  store.dispatch(setUser(null));
  store.dispatch(setLogOut(true));
  store.dispatch(resetModals());
};

instance.interceptors.request.use(
  async (config: any) => {
    config.meta = config.meta || {};
    config.meta.requestStartedAt = new Date().getTime();
    config.headers = {
      "Content-Type": "application/json",
      ...config.headers,
      timeout: 5000,
    };
    // if (
    //   !logoutEveryNTimeWhenNoAction() &&
    //   config.data.action !== "admin_auth_login"
    // ) {
    //   logOut();
    //   return null;
    // }
    if (
      !!Cookies.get(MAIN_TOKEN_NAME) ||
      config.data.action === "admin_auth_login"
    )
      return config;
  },
  (error) => Promise.reject(error.response)
);

instance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      logOut();
    } else {
      return Promise.reject(error.response);
    }
    // Router.push("/login");
  }
);

export default instance;
