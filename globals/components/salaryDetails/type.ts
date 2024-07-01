import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
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
