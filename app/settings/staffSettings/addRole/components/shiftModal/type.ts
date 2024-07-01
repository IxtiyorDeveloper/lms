import React from "react";
import {
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

export type ShiftModal = {
  handleClose: () => void;
  handleSubmit: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: any;
  onSubmit: (data: any) => void;
  open: boolean;
  errors: any;
  watch: any;
  getValues: any;
  reset: any;
};
