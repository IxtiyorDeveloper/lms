import { IAssignment, TAssignment } from "types";
import { ISalaryMain } from "types/finance/salary";

export interface IDefinition {
  record: TAssignment;
  data: ISalaryMain;
  detailedData: TAssignment | undefined;
}
