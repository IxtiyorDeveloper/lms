import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type TGender = {
  label: string;
  name: string;
  control: any;
  disabled?: boolean;
  contents?: {
    content?: React.ReactNode;
    value: string;
  }[];
  required?: boolean;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};
