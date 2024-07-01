import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export interface IType {
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any, FieldValues>;
  watch: UseFormWatch<FieldValues>;
  selects: any;
  setError: any;
  clearErrors: any;
}
