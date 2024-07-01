import { ReactNode } from "react";
import { TParams } from "types";

export type TTab = {
  menu: TMenuList[];
  onChange?: (newValue: number) => void;
  initValue?: number;
  p?: TPaddingTab;
  tabWidth?: string;
  tabItemWidth?: string;
  action?: ReactNode;
  forAttendance?: boolean;
};

export type TMenuList = {
  label: string | ReactNode;
  children?: ReactNode;
  icon?: any;
  isClickable?: boolean;
  query?: TParams;
};

type TPaddingTab = {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
};
