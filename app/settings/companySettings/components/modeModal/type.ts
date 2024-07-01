import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

export type TModal = {
  handleClose: () => void;
  handleSubmit: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<FieldValues, any>;
  onSubmit: (data: any) => void;
  open: boolean;
  errors: FieldErrors<FieldValues>;
};
