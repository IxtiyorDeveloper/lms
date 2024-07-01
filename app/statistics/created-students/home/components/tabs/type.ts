import { ETabStatuses, IFetchList } from "types";
import { OneStudent } from "types/student";

export interface ITabs {
  tab_id: string | ETabStatuses.TAB_WAITING;
  data: IFetchList<OneStudent> | undefined;
}
