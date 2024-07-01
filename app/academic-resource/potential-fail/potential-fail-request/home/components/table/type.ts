import { IFetchList } from "types";
import { IPotentialFailRequest } from "types/potentialFail/potentialFailRequest";

export interface ITable {
  data: IFetchList<IPotentialFailRequest> | undefined;
  isLoading: boolean;
}
