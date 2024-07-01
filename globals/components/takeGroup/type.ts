import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormWatch,
} from "react-hook-form";
import React from "react";
import { TStatuses } from "types";

export type TGroupModal = {
  handleClose: () => void;
  handleSubmit: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: any;
  onSubmit: (data: any) => void;
  open: boolean;
  errors: any;
  watch: UseFormWatch<FieldValues>;
  transferCapability: {
    [key in TStatuses]?: number[];
  };
};
