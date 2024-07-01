import { CSSProperties } from "react";
import { IGroup } from "types";

export interface ISameCard {
  group: any;
  large?: boolean;
  lastTwo?: boolean;
  gridStyle?: CSSProperties;
  lastStyle?: CSSProperties;
  fullStatus?: any;
  setOpen?: (open?: any, group?: IGroup) => void;
}
