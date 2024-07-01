import { TAssignment } from "types";
import { getData } from "../getData";
import { ESalaryRange, IDifference, StaffStatus } from "types/finance/salary";
import { handleSort } from "./handleSort";
import { filterColumns } from "./filterColumns";
import { filterDataByBranches } from "./branchFilter";

export const getColumns = ({
  assignments,
  difference,
  watchAll,
}: {
  assignments: TAssignment[];
  difference: IDifference;
  watchAll: any;
}) => {
  let avans = 0,
    penalty = 0,
    card = 0,
    cash = 0,
    tax = 0,
    total_salary = 0,
    average = 0,
    count = 0,
    increase = 0,
    decrease = 0,
    equal = 0,
    high = 0,
    normal = 0,
    low = 0;
  let unclear = 0;

  const fullName = watchAll?.full_name;

  const sorted = handleSort({ watchAll, assignments });
  const filtered = filterColumns({ watchAll, sorted });

  const branchIds = watchAll?.branch?.map((item: { toS: any }) =>
    item?.toString(),
  );

  const branchFiltered = filterDataByBranches({ data: filtered, branchIds });
  const calculated = getData({ data: branchFiltered, searchText: fullName });

  calculated?.forEach((curr) => {
    const {
      avans: currAvans,
      penalty: currPenalty,
      card: currCard,
      cash: currCash,
      tax: currTax,
      total_salary: currTotalSalary,
      staff_status: currStaffStatus,
      difference_last_month_salary: currDifferenceLastMonthSalary,
      amount_status: currAmountStatus,
    } = curr;

    avans += +currAvans || 0;
    penalty += +currPenalty || 0;
    card += +currCard || 0;
    cash += +currCash || 0;
    tax += +currTax || 0;
    total_salary += +currTotalSalary || 0;

    if (currStaffStatus === StaffStatus.WORKING) {
      average += currTotalSalary ? +currTotalSalary : 0;
      count++;
    }
    if (currDifferenceLastMonthSalary > 0) {
      increase++;
    }
    if (currDifferenceLastMonthSalary < 0) {
      decrease++;
    }
    if (currDifferenceLastMonthSalary == 0) {
      equal++;
    }
    switch (currAmountStatus) {
      case ESalaryRange.HIGH:
        high++;
        break;
      case ESalaryRange.NORMAL:
        normal++;
        break;
      case ESalaryRange.LOW:
        low++;
        break;
      case ESalaryRange.UNCLEAR:
        unclear++;
        break;
    }
  });

  const averageSalary = count > 0 ? Math.round(average / count) : 0;

  return {
    filtered: calculated,
    avans,
    penalty,
    card,
    cash,
    tax,
    total_salary,
    total_difference: difference?.total,
    header: {
      length: calculated?.length,
      average: averageSalary,
      increase,
      decrease,
      equal,
      high,
      normal,
      low,
      unclear,
      average_difference: difference?.average,
    },
  };
};
