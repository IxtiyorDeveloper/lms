import React from "react";
import {
  Control,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { TCompany } from "types";
import { ILeavingCategoryUpdate } from "types/leavingCategory";

export type TModal = {
  handleClose: () => void;
  handleSubmit: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<ILeavingCategoryUpdate, any>;
  onSubmit: (data: any) => void;
  open: boolean;
  errors: any;
  companyData?: TCompany | undefined;
  buttonLoading: boolean;
  isLoading: boolean;
};
