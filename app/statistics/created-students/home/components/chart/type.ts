import { IFetchList } from "types";
import { OneStudent } from "types/student";

export interface ITabs {
  data: IFetchList<OneStudent> | undefined;
}
