import {
  CallRequestSvg,
  ColoredNotRespondedSvg,
  ComingSvg,
  FilledSmsSvg,
  LittlePhoneSvg,
} from "../components";
import { bgColors, textColors } from "styles/theme";

export const ACTION_CALL = 100;
export const ACTION_R_CALL = 200;
export const ACTION_CALL_BACK = 300;
export const ACTION_TAKE = 400;
export const ACTION_SMS = 500;
export const ACTION_CREATE = 600;
export const ACTION_NEW_LEAD = 700;
export const ACTION_CHANGE_STATUS = 800;
export const ACTION_CHANGE_COMMENT = 900;
export const ACTION_CHANGE_NAME = 1000;
export const ACTION_CHANGE_NAME_OR_COMMENT = 1100;
export const ACTION_ADDED_TO_TAB = 1200;
export const ACTION_REGISTERED = 1300;
export const ACTION_WILL_COME = 1400;
export const EventLifeCycle = [
  {
    text: "Call",
    icon: LittlePhoneSvg,
    color: bgColors.midori,
    textColor: textColors.white,
    action: ACTION_CALL,
  },
  {
    text: "Call request",
    icon: CallRequestSvg,
    color: bgColors.spring,
    textColor: textColors.black,
    action: ACTION_CALL_BACK,
  },
  {
    text: "Not answer",
    icon: ColoredNotRespondedSvg,
    color: bgColors.pop,
    textColor: textColors.white,
    action: ACTION_R_CALL,
  },
  {
    text: "Take",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_TAKE,
  },
  {
    text: "SMS",
    icon: FilledSmsSvg,
    color: bgColors.primary,
    textColor: textColors.black,
    action: ACTION_SMS,
  },
  {
    text: "Create",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_CREATE,
  },
  {
    text: "New lead",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_NEW_LEAD,
  },
  {
    text: "Change callStatus",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_CHANGE_STATUS,
  },
  {
    text: "Change comment",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_CHANGE_COMMENT,
  },
  {
    text: "Change name",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_CHANGE_NAME,
  },
  {
    text: "Change name or comment",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_CHANGE_NAME_OR_COMMENT,
  },
  {
    text: "Added to tab",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_ADDED_TO_TAB,
  },
  {
    text: "Registered",
    icon: LittlePhoneSvg,
    color: bgColors.sinter,
    action: ACTION_REGISTERED,
  },
  {
    text: "Coming",
    icon: ComingSvg,
    color: bgColors.purpleCrystal,
    textColor: textColors.black,
    action: ACTION_WILL_COME,
  },
  // {
  //   text: "Call",
  //   icon: <LittlePhoneSvg />,
  //   color: bgColors.spring,
  //   action: ACTION_CALL,
  // },
  // {
  //   text: "Event",
  //   icon: <LittleCalendarSvg />,
  //   color: bgColors.bonnie,
  //   action: ACTION_CALL,
  // },
  // {
  //   text: "Shop",
  //   icon: <ShoppingBagSvg />,
  //   color: bgColors.lavender,
  //   action: ACTION_CALL,
  // },
  // {
  //   text: "Payment",
  //   icon: <DollarSvg />,
  //   color: bgColors.transparentGreen,
  //   action: 300,
  // },
  // {
  //   text: "Transferred",
  //   icon: <LittleShareSvg />,
  //   color: bgColors.sinter,
  //   action: 400,
  // },
  // {
  //   text: "SMS",
  //   icon: <LittleMailSvg />,
  //   color: bgColors.lemon,
  //   action: ACTION_SMS,
  // },
];
