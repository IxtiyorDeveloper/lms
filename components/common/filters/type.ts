import { IOption, ISelectProps } from "../select/type";
import { InputProps } from "antd";
import React from "react";
import { ColProps } from "antd/es/grid/col";
import { IUseExcludeInterface } from "utils/useExclude";
import { FieldValues, UseFormReturn } from "react-hook-form";

export type ElementTypes =
  | "input"
  | "search"
  | "select"
  | "debounceSelect"
  | "phone"
  | "number"
  | "rangePicker"
  | "checkbox"
  | "money"
  | "switch"
  | "debounceSelect"
  | "treeSelect"
  | "datePicker";

// @ts-ignore
export interface IArgs
  extends Omit<
      ISelectProps,
      "name" | "control" | "placeholder" | "defaultValue" | "allowClear"
    >,
    InputProps {
  check_field?: string;
  format?: any;
  showTime?: boolean;
  valueFormat?: string;
  promisedValue?: string | number | string[] | number[];
  defaultValue?: any;
  getPopupContainer?: (triggerNode: any) => React.ReactNode;
  treeCheckable?: boolean;
}

export interface IElement {
  name: string;
  label?: string | React.ReactNode;
  fetchOptions?: (search: string) => Promise<any>;
  placeholder?: string;
  elementType: ElementTypes;
  options?: string;
  customOptions?: IOption[];
  check_field?: string;
  args?: IArgs;
  colProps?: ColProps;
  full_width?: boolean;
  isVisible?: boolean;
  permission?: string[];
}

export interface Interface {
  activeElements: IElement[];
  useExcludeArguments: IUseExcludeInterface;
  resetQueryExceptions?: string[];
  methods: UseFormReturn<FieldValues, any>;
  selects?: any;
  is_course?: boolean;
  isFieldsRequired?: boolean;
  dateFormatDisabled?: boolean;
  dates?: {
    enterFieldsName: string;
    firstFieldName: string;
    secondFieldName: string;
    isVisible?: boolean;
  }[];
  deletedFields?: string[];
  isReplaceDefaultValueToRoute?: boolean;
  defaultValues?: {
    [key: string]: any;
  };
}
