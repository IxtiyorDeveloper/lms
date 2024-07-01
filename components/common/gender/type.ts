import { ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type TGender = {
  label?: string;
  value: number | string;
  name: string;
  control: any;
  icon: (checked: boolean) => ReactNode | string;
  disabled?: boolean;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  checkedColor?: string;
};
