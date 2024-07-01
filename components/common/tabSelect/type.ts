import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { ESelectAll } from "../../../types";
import { ITabSelectOptions } from "types/tabSelect";

export interface ITabSelect {
  options?: ITabSelectOptions[];
  name: string;
  control: any;
  error?: any;
  placeholder?: string | ReactNode;
  colorBgContainer?: string;
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
  popupMatchSelectWidth?: boolean;
  maxTagCount?: number | "responsive" | undefined;
  selectAllType?: ESelectAll;
  dropdownRender?:
    | ((
        menu: ReactElement<any, string | JSXElementConstructor<any>>,
      ) => ReactElement<any, string | JSXElementConstructor<any>>)
    | undefined;
}
