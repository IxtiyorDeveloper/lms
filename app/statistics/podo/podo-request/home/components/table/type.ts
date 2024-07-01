import { IFetchList } from "types";
import { IPodoRequest } from "types/statistics/podoRequest";

export interface ITable {
  data: IFetchList<IPodoRequest> | undefined;
  isLoading: boolean;
}
