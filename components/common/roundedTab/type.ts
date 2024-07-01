import * as React from "react";
import { TParams } from "types";

export interface ITabItem {
  id?: number | string;
  title: (isActive: boolean) => React.ReactNode;
  query?: TParams;
  children?: React.ReactNode;
  isHaveUpdate?: boolean;
  isHaveDelete?: boolean;
  isShow?: boolean;
  onPressDelete?: () => void;
  onPressUpdate?: () => void;
}

export interface IStyles {
  tabsAlign?: string;
  paddingTab?: string;
  isSimpleBtn?: boolean;
  isBorderBottom?: boolean;
  buttonPadding?: string;
  activeBg?: string;
  tabBg?: string;
  bgColor?: string;
  textColor?: string;
  activeTabBg?: string;
  beforeColor?: string;
  activeTColor?: string;
  buttonBgColor?: string;
  tabWidth?: string;
  gap?: string;
  inActiveTabBg?: string;
  inActiveBg?: string;
  customBg?: string;
  boxShadow?: string;
}

export interface ITab {
  tabs: ITabItem[];
  tabName?: "roundedTabIndex" | "secondaryTabIndex" | string;
  containerStyle?: React.CSSProperties | undefined;
  isAdd?: boolean;
  allStyles?: IStyles;
  rightChild?: ITabItem[];
  handleClick?: () => void;
  tabKey?: ETabKey;
  defaultKey?: number | null;
}
export enum ETabKey {
  id = "id",
  index = "index",
}
export interface IInnerWrapper {
  isSimpleBtn?: boolean;
  isBorderBottom?: boolean;
  beforeColor?: string;
  bgColor: string;
  tabBg?: string;
  padding?: string;
  gap?: string;
  tabsAlign?: string;
  tabWidth: string;
  activeTabBg: string;
  textColor?: string;
  activeTColor?: string;
  buttonBgColor?: string;
  customBg?: string;
  boxShadow?: string;
}
