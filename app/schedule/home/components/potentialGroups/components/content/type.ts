import { IPotentialGroup, ISchedule } from "types";

export interface IType {
  data: ISchedule | undefined;
  day_id?: string;
  potentialGroups: IPotentialGroup[] | undefined;
  initValue: string | number;
  isLoading: boolean;
}
