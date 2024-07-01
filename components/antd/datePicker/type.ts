import { ReactNode } from "react";

export interface TDatePicker {
  name: string;
  control: any;
  label?: string | ReactNode;
  disabled?: boolean;
  defaultValue?: any;
  error?: any;
  isFlex?: boolean;
  format?: any;
  showTime?: any;
  picker?: "time" | "date" | "week" | "month" | "quarter" | "year" | undefined;
  valueFormat?: string;
  showToday?: boolean;
}
