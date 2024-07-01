import { UseFormClearErrors, UseFormGetValues } from "react-hook-form";

export type TCreateStudentPhoneNumber = {
  control: any;
  error: any;
  register: any;
  options: any[];
  watch: any;
  getValues: UseFormGetValues<{ root: any }>;
  clearError: UseFormClearErrors<any>;
  setError?: any;
  setValue?: any;
  balance?: number;
};
