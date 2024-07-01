import { ISalaryMain } from "types/finance/salary";
import { IDepartment } from "types/department";
import { IAssignment, IRole } from "types";

export interface Interface {
  data: ISalaryMain[] | undefined;
}

export interface ISalaryTotal {
  card_1: {
    total_salary: number;
    fixed: number;
    kpi: number;
    bonus: number;
    correction: number;
  };
  card_2: {
    total_avans: number;
    avans: { department: IDepartment; total: number }[] | null;
  };
  card_tax: {
    total_tax: number;
    tax: { department: IDepartment; total: number }[] | null;
  };
  card_3: {
    total_penalty: number;
    penalty: { total: number; role: IRole; num: number }[] | null;
  };
  card_4: {
    total_card: number;
    card: { assignment: IAssignment }[] | [];
  };
  card_5: {
    total_cash: number;
  };
}
