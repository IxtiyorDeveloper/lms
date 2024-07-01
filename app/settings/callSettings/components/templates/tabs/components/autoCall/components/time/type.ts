import { FieldValues, UseFormGetValues } from "react-hook-form";

export interface IType {
  control: any;
  getValues: UseFormGetValues<FieldValues>;
}
