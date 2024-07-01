import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { TModalType } from "types/modal";

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
  type?: TModalType;
  data?: any;
  setValue?: any;
  isLoading?: boolean;
};
