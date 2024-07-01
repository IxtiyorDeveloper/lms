import { CSSProperties } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type Type = {
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
  placeholder?: string;
  name: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  control: any;
  required?: boolean;
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  checked?: boolean | null;
  isEmptySpace?: boolean;
  promisedValue?: string | number | string[] | number[];
  colorPrimary?: string;
};
