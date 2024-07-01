import { CSSProperties } from "react";

export interface IMuskInputProps {
  control: any;
  name: string;
  placeholder?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  onFocus?: () => void;
  defaultValue?: string;
  onComplete?: (value?: string) => void;
  onBlur?: () => void;
  className?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  style?: CSSProperties;
}
