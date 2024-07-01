import React, { ReactNode } from "react";

export interface ISelectProps {
  options?: IOption[] | undefined;
  name: string;
  control: any;
  error?: any;
  placeholder?: string | ReactNode;
  defaultValue?: IOption;
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
  isParentDisabled?: boolean;
  className?: string;
  getPopupContainer?: (triggerNode: any) => React.ReactNode;
  treeCheckable?: boolean;
}

export interface IOption {
  label: React.ReactNode;
  value?: string | number | null;
  children?: IOption[];
  additional?: any;
  disabled?: boolean;
}
