import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormSetValue,
} from "react-hook-form";

export type Type = {
  placeholder?: string;
  name: string;
  type?: "password" | "input" | "textarea" | "file";
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
  setValue: UseFormSetValue<FieldValues>;
};
