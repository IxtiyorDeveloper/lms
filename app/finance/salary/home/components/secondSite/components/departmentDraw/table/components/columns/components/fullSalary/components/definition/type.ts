import { TAssignment } from "types";
import { ISalaryMain } from "types/finance/salary";

export interface IDefinition {
  record: TAssignment;
  data: ISalaryMain;

  handleOpenChange(newValue: boolean): void;
}
