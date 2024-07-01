import { ISalaryMain } from "types/finance/salary";
import { TAssignment } from "types";

export interface IDefinition {
  record: TAssignment;
  data: ISalaryMain;
  detailedData: TAssignment | undefined;
}
