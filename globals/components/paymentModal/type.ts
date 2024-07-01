import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormWatch,
} from "react-hook-form";
import React from "react";

export type TPaymentModal = {
  handleClose?: () => void;
  handleSubmit: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  control?: any;
  onSubmit: (data: any) => void;
  open: boolean;
  errors?: any;
};
export interface debtorGroupInterface {
  key: string | number;
  name: string;
  period: string;
  lesson: string | number;
  amount?: string | number;
}
export interface debtorGroupInterface {
  key: string | number;
  name: string;
  period: string;
  lesson: string | number;
  amount?: string | number;
}
