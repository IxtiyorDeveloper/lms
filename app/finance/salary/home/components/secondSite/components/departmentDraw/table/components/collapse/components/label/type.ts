import { IAggregated } from "types/finance/salary";
import { SalaryEnums, SalarySubTypeEnums, TAssignment } from "types";

export interface ILabel {
  handleDelete: (id: number | null, type: SalaryEnums) => void;
  obj: {
    labels: IAggregated[];
    num: number;
    title: string;
    type: SalaryEnums;
    sub_type: SalarySubTypeEnums;
  };
  isGiven: boolean;
  row: { original: TAssignment };
  front: "" | "-";
}
