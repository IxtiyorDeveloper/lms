import { ReactElement } from "react";

export type TDatePicker = {
  name: string;
  control: any;
  label?: string | ReactElement;
  disabled?: boolean;
  defaultValue?: any;
  error?: any;
  format?: any;
  required?: boolean;
  className?: string;
};
