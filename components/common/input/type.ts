import React, { CSSProperties } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type Type = {
  style?: CSSProperties;
  placeholder?: string;
  name: string;
  type?: "password" | "input" | "textarea" | "file" | "number";
  htmlType?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  control: any;
  required?: boolean;
  label?: string | React.ReactNode;
  disabled?: boolean;
  rows?: number;
  defaultValue?: number | string;
  shadow?: boolean;
  suffix?: React.ReactNode | string;
  autoComplete?: string;
  hasThreeDots?: boolean;
  colorText?: string;
  colorBgContainer?: string;
  visibilityToggle?: boolean;
  onlyText?: boolean;
  onlyNumber?: boolean;
};
