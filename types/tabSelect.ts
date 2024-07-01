import { ReactNode } from "react";

export interface ITabSelectOptions {
  label: string | ReactNode;
  value: string | number;
  options?: ITabSelectSingleOption[];
}
export interface ITabSelectSingleOption {
  label: string | ReactNode;
  value: string | number;
}
