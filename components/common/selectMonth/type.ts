import { CSSProperties } from "react";

export type TSelectMonth = {
  onChange?: (date: string) => void;
  initValue?: string;
  mx?: string;
  style?: CSSProperties;
  nextMonthsCount?: number;
  className?: string;
};
