import { DefaultOptionType } from "antd/lib/select";
import { SelectProps } from "antd/es/select";
import { Control } from "react-hook-form";
import { ReactElement } from "react";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<any>;
  afterFetch?: (option: DefaultOptionType) => void;
  error?: any;
  label?: string | ReactElement;
  required?: boolean;
  debounceTimeout?: number;
  name: string;
  control?: Control<any>;
  showDefaultValue?: boolean;
  isValue?: boolean;
  multiSelect?: undefined | "multiple";
  urlKey?: string;
  extraParams?: any;
}
