import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { SelectProps } from "antd";
import { ESelectAll } from "types";

export interface ISelectProps extends Omit<SelectProps, "options"> {
  options?: IOption[] | undefined;
  name: string;
  control: any;
  error?: any;
  onChangeValue?: any;
  placeholder?: string | ReactNode;
  defaultValue?:
    | {
        label?: ReactNode | string;
        value?: string | boolean | number;
        additional?: any;
      }
    | string;
  required?: boolean;
  disabled?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  label?: string | ReactNode;
  bgColor?: string;
  loading?: boolean;
  mode?: "multiple" | "tags";
  showSearch?: boolean;
  onSearch?: any;
  style?: React.CSSProperties;
  icon?: ReactNode | undefined;
  allowClear?: boolean;
  labelInValue?: boolean;
  listHeight?: number;
  className?: string;
  isSelectAll?: boolean;
  maxTagCount?: number | "responsive" | undefined;
  selectAllType?: ESelectAll;
  dropdownRender?:
    | ((
        menu: ReactElement<any, string | JSXElementConstructor<any>>,
      ) => ReactElement<any, string | JSXElementConstructor<any>>)
    | undefined;
}

export interface IOption {
  label: React.ReactNode;
  value?: string | number | null | boolean;
  disabled?: boolean;
  children?: Omit<IOption, "children">[];
  additional?: any;
  extra?: any;
}
