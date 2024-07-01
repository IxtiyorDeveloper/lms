import React, { CSSProperties } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { IIconProps } from "types";

export interface TInputWithIcon {
  icon: (props: IIconProps) => JSX.Element;
  wrapperStyle?: CSSProperties;
  style?: CSSProperties;
  placeholder?: string;
  name: string;
  type?: "password" | "input" | "textarea" | "file";
  htmlType?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  control: any;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  rows?: number;
  defaultValue?: number | string;
  isEmptySpace?: boolean;
  isBoxShadow?: boolean;
  isFormatted?: boolean;
  suffix?: React.ReactNode | string;
}
