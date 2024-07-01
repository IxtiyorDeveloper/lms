import { SalaryEnums, SalaryToGroupForm, TAssignment } from "types";

export const generateCurrentKPI = ({
  record,
  groupForm,
}: {
  record: TAssignment;
  groupForm: number;
}) => {
  const filtered = record?.salaryComponents?.filter(
    (i) => i.type == SalaryEnums.KPI
  );
  const label = SalaryToGroupForm[groupForm as keyof typeof SalaryToGroupForm];
  return filtered?.find((f) => f.sub_type == label);
};
