import { ITabSelectOptions } from "types/tabSelect";
import { Dispatch, SetStateAction } from "react";

export interface ITabOptions {
  data?: ITabSelectOptions[];
  onChange: any;
  value: any;
  reset(): void;
  mode?: "multiple" | "tags";
  listHeight: number;
  setOpen: Dispatch<SetStateAction<boolean | undefined>>;
}
