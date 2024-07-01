import { CSSProperties } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type Type = {
  style?: CSSProperties;
  name: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  control: any;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  wrapperStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  colorStyle?: CSSProperties;
  heightColor?: number;
  colors?: { color: string }[];
};
