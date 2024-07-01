import React from "react";
import {
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
  control: any;
  onSubmit: (data: any) => void;
  open: boolean;
  errors: any;
};
