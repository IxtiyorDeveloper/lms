import React, { CSSProperties, ReactNode } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { IContacts } from "types/contact";
import { OneStudent } from "types/student";

export type TModal = {
  onSubmit: (data: any) => void;
  open: boolean;
  icon?: any;
  text: string | React.ReactNode;
  blurColor: string | null;
  handleClose: () => void;
  boxShadow?: string;
  textarea?: React.ReactNode;
  handleSubmit: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  control?: any;
  type?: "password" | "input" | "textarea" | "file";
  errors?: any;
  label?: string;
  value?: any;
  vertical?: boolean;
  cancelButtonText?: string;
  submitButtonText?: string;
  buttonStyles?: CSSProperties;
  buttonLoading?: boolean;
  iconBlur?: string;
  width?: number;
  component?: (control: any, errors: any) => ReactNode;
  student?: IContacts | OneStudent;
  nameKey?: string;
};
