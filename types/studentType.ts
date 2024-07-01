import { CSSProperties } from "react";

export type TStudent = {
  title: string;
  children?: any;
  style?: CSSProperties;
};

export enum ScheduleButton {
  PINK = "pink",
  BLACK = "black",
  PRIMARY = "primary",
  DEFAULT = "default",
  NODESIGN = "noDesign",
  LEMON = "lemon",
}
export enum ButtonSize {
  LARGE = "large",
  MEDIUM = "medium",
}
