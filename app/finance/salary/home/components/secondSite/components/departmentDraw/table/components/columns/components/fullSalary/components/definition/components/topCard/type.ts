import { ISalaryMain } from "types/finance/salary";
import { TAssignment } from "types";

export interface IDefinition {
  record: TAssignment;
  data: ISalaryMain;
  isTeacher: boolean;
}
