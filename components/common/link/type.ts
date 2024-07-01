import { ReactNode } from "react";
import { UrlObject } from "url";

export interface Type {
  children: string | ReactNode;
  href: string | UrlObject;
  disabled?: boolean;
}
