import { CSSProperties } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import React from "react";
export type Type = {
  style?: CSSProperties;
  labelStyle?: CSSProperties;
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
  label?: string | React.ReactNode;
  disabled?: boolean;
  rows?: number;
  defaultValue?: boolean;
  isEmptySpace?: boolean;
  widthSwitch?: number | string;
};
