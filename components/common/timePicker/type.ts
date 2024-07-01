import { Control, FieldValues } from "react-hook-form";
import { TimePickerProps } from "antd";

export interface Type extends TimePickerProps {
  defaultValue?: any;
  name: string;
  control: Control<FieldValues, any>;
  showSecond?: boolean;
  disabled?: boolean;
  format?: string;
  error?: string;
  label?: string;
  watchDefaultValue?: boolean;
}
