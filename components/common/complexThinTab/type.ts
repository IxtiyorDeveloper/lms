import React, { ReactNode } from "react";
import { bgColors } from "styles/theme";

export type TTab = {
  menu: TMenuList[];
  onChange?: (newValue: number) => void;
  initValue?: number;
  reversed?: boolean;
  p?: TPaddingTab;
  styles?: React.CSSProperties;
  label?: string | React.ReactNode;
  inactiveIconColor?: keyof typeof bgColors;
  topLeftChildren?: React.ReactNode;
  headPadding?: number;
  heightTab?: string;
  centered?: boolean;
  headStyle?: React.CSSProperties;
  isDefault?: boolean;
  paddingTab?: string;
};
type TMenuList = {
  label: string | ReactNode;
  children?: ReactNode;
  icon?: any | ReactNode;
  isClickable?: boolean;
  query?: {
    [key: string]: any;
  };
};

type TPaddingTab = {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
};

export type TGroupTab = {
  menu: TGroupMenuList[];
  onChange?: (newValue: number) => void;
  initValue?: number;
  mx?: string;
};

type TGroupMenuList = {
  label: string;
  children: ReactNode;
};
