import React, { CSSProperties, ReactNode } from "react";
import { UserLabel } from "./userLabel";

export interface TIcon {
  size: "medium" | "small";
  clicked?: { [key: string]: boolean };
  setClicked?: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  label?: string | React.ReactNode;
  onClick?: (data?: any) => void;
  defaultValue?: UserLabel;
  onChange?: (e: any) => void;
  isOpen?: boolean | string;
  userId?: number;
  showTime?: boolean;
  borderColor?: boolean;
  hasCalendar?: boolean;
  disabled?: boolean;
  renderExtraButtons?: () => ReactNode;
  isHasReset?: boolean;
  loading?: boolean;
  createdBy?: string;
  isFilled?: boolean;
}

export interface IIconProps {
  style?: CSSProperties;
  width?: number | string;
  className?: string;
  isActive?: boolean;
  height?: number | string;
  color?: string;
  bgColor?: string;
  onClick?: (e: any) => void;
}
