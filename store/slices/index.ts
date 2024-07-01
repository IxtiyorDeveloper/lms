import { combineReducers } from "@reduxjs/toolkit";

/** reducers */
import ui from "./ui/ui";
import sidebar from "./sidebar/sidebar";
import user from "./user";
import modals from "./modals";
import captchaKey from "./captchaKey";
import sip from "./sip";
import salary from "./salary";
import leads from "./leads";
import check from "./check";
import audio from "./audio";

/** Main reducer function */
export default combineReducers({
  ui,
  sidebar,
  user,
  modals,
  captchaKey,
  sip,
  salary,
  leads,
  check,
  audio,
});

/** Export selectors and action functions */
export * from "./ui/ui";
export * from "./sidebar/sidebar";
export * from "./user";
export * from "./modals";
export * from "./captchaKey";
export * from "./sip";
export * from "./salary";
export * from "./leads";
export * from "./check";
export * from "./audio";
