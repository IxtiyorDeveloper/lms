import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import React from "react";
import { IContacts } from "types/contact";
import { IOption } from "components/common/select/type";

export interface IType {
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any, FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setActiveStudent: React.Dispatch<
    React.SetStateAction<(IContacts & { [p: string]: string }) | undefined>
  >;
  setOptions: React.Dispatch<React.SetStateAction<IOption[]>>;
  activeStudent: (IContacts & { [p: string]: string }) | undefined;
  options: IOption[];
  selects: any;
  setError: any;
  clearErrors: any;
}
