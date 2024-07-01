import { bgColors } from "styles/theme";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "./studentStatuses";

export const rowColors: {
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
} = {
  "100": bgColors.lemon,
  "200": bgColors.lemon,
  "300": bgColors.white,
  "400": bgColors.white,
  "500": bgColors.wildSand,
  "600": bgColors.pale,
};
export const markColors = {
  [NEW_STUDENT_NOT_ATTENDED]: bgColors.primary,
  [NEW_STUDENT_ATTENDED]: bgColors.primary,
  [STUDYING_STUDENT]: bgColors.midori,
  [TRANSFERRING_STUDENT]: bgColors.deep,
  [TRANSFERRED_STUDENT]: bgColors.yourShadow,
  [STOPPING_STUDENT]: bgColors.pepper,
};

export const markColorsFreshman = {
  "100": "transparent",
  "300": bgColors.black,
};
export const opacityRows = {
  "100": 1,
  "200": 1,
  "300": 1,
  "400": 1,
  "500": 0.5,
  "600": 1,
};
