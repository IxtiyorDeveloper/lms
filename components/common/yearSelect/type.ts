import { CSSProperties } from "react";

export type TSelectYear = {
  onChange?: (date: string) => void;
  initValue?: string;
  mx?: string;
  style?: CSSProperties;
  nextYearsCount?: number;
  isDouble?: boolean;
};
