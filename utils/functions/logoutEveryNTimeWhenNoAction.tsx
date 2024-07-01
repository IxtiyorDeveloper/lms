import Cookies from "js-cookie";
import { LAST_ACTION_TIME_NAME } from "constants/tokenNames";
import debounce from "lodash/debounce";

const timeLimit = 86400000;
// const timeLimit = 15000;

export const logoutEveryNTimeWhenNoAction = debounce(() => {
  let time = Cookies.get(LAST_ACTION_TIME_NAME);
  if (!time) {
    time = Date.now().toString();
    Cookies.set(LAST_ACTION_TIME_NAME, time, { expires: +time + timeLimit });
    return true;
  } else if (Date.now() - +time <= timeLimit) {
    time = Date.now().toString();
    Cookies.set(LAST_ACTION_TIME_NAME, time, { expires: +time + timeLimit });
    return true;
  }
  return false;
}, 500);
