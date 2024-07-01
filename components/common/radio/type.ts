import { Control } from "react-hook-form";
import { CSSProperties, ReactElement, ReactNode } from "react";

interface IOption {
  value: boolean | string | number;
  label: string | ReactElement | ReactNode;
}

export interface IRadiosProps {
  options?: IOption[];
  label?: string | ReactElement | ReactNode;
  error?: any;
  style?: CSSProperties;
  left?: boolean;
  control: Control<any>;
  name: string;
  disabled?: boolean;
}
