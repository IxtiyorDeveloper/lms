import { ITabSelectSingleOption } from "types/tabSelect";

export interface Type {
  item: ITabSelectSingleOption;
  value: any;
  mode?: "multiple" | "tags" | undefined;
}
