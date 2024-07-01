import { CSSProperties, ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type Type = {
  style?: CSSProperties;
  placeholder?: string;
  name: string;
  type?: "password" | "input" | "textarea" | "file";
  htmlType?: string;
  colorBgContainer?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  control: any;
  required?: boolean;
  label?: string | ReactNode;
  disabled?: boolean;
  rows?: number;
  defaultValue?: number;
  lineHeight?: number;
  isEmptySpace?: boolean;
  className?: string;
};
