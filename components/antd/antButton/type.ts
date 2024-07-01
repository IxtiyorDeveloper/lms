import { CSSProperties, ReactNode } from "react";
import React from "react";
export interface IButtonProps {
  disabled?: boolean;
  buttonType?: "regular" | "green";
  type?: "button" | "submit" | "reset";
  text?: string;
  iconUrl?: string;
  style?: CSSProperties | undefined;
  bgColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  textStyle?: CSSProperties | undefined;
  icon?: ReactNode;
  className?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  args?: any;
  buttonLoading?: boolean;
  wrapperStyle?: CSSProperties | undefined;
  isClickAnimation?: boolean;
}
