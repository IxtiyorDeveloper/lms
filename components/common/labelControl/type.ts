import React, { CSSProperties } from "react";
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
  data: Interface[];
  defaultValue?: string[];
};

interface Interface {
  value: number;
  label: string;
  color: string;
  styles?: CSSProperties;
  activeStyles?: CSSProperties;
  href?: string;
}
