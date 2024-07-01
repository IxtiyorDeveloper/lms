import { IGroup, IRange, TAssignment } from "types";
import { IAggregated, ISalaryMain } from "types/finance/salary";

export interface IDefinition {
  currentTab?:
    | { group_form: string; groups: IGroup[]; range: IRange }
    | undefined;
  KPI: IAggregated | undefined;
}
