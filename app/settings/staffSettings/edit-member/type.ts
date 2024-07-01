import { IStaffViewPageInfoData } from "types/staffSettings";

export interface IDataGetOne {
  dataGetOne: IStaffViewPageInfoData | undefined;
  isLoading: boolean;
}
