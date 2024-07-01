import { SalaryEnums, SalarySubTypeEnums, TParams } from "types";
import { Control, FieldValues } from "react-hook-form";
import React from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { IAggregated } from "types/finance/salary";

export interface ITop {
  obj: {
    labels: IAggregated[];
    num: number;
    title: string;
    type: SalaryEnums;
    sub_type: SalarySubTypeEnums;
  };
  isGiven: boolean;
  open: string | undefined;
  row: any;
  handleOpenChange: (type: SalaryEnums, open: boolean) => void;
  handleSubmit: any;
  onSubmit: any;
  control: Control<FieldValues, any>;
  title: { 500: string; 600: string; 400: string };
  setOpen: React.Dispatch<React.SetStateAction<string | undefined>>;
  createSalaryComponent: UseMutationResult<any, Error, TParams, unknown>;
}
