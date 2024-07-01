import { ReactNode } from "react";
import type { UrlObject } from "url";

export interface Type {
  children: string | ReactNode;
  href?: string | UrlObject;
  disabled?: boolean;
  target?: string;
}
