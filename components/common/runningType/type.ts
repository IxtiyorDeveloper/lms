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
  data: Interface[] | null;
  isLoading?: boolean;
};

interface Interface {
  tabId: number;
  title: string;
  color: string;
  svg: React.ReactNode;
  bottom?: boolean;
  styles?: CSSProperties;
  activeStyles?: CSSProperties;
  lessons: number;
  dates: string;
  count: number;
  empty_lessons: number;
  error: string;
  prep: number;
  exam_days: number;
  wom_days: number;
}
