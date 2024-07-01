import React from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { IFetchList, ILead } from "types";

export interface TNewLeadTable {
  onSubmitChangeColor: (id: number, color: string, index?: number) => void;
  handleClickCallBack: (
    id: number,
    action: number,
    date: Date,
    index?: number
  ) => void;
  onSubmitChangeComment: (id: number, comment: string, index?: number) => void;
  leads: IFetchList<ILead> | undefined;
}

export type LifeCycleModal = {
  // handleClose?: () => void;
  handleSubmit?: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  control?: any;
  onSubmit?: (data: any) => void;
  // open: boolean;
  errors?: any;
};
