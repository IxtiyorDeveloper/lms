import { ReactNode } from "react";

export interface IBigCard {
  ndChild?: ReactNode | string;
  gridChild: (search: string) => ReactNode;
  title?: string;
  count?: number;
}
