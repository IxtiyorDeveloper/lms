import { fixed } from "styles/theme";
import { ISalaryTotal } from "../../type";

export function dataGenerate({ total }: { total: ISalaryTotal }) {
  return [
    {
      name: "Fixed",
      total: (total?.card_1?.fixed / total?.card_1?.total_salary)?.toFixed(
        fixed
      ),
    },
    {
      name: "KPI",
      total: (total?.card_1?.kpi / total?.card_1?.total_salary)?.toFixed(fixed),
    },
    {
      name: "Bonus",
      total: (total?.card_1?.bonus / total?.card_1?.total_salary)?.toFixed(
        fixed
      ),
    },
    {
      name: "Correction",
      total: (total?.card_1?.correction / total?.card_1?.total_salary)?.toFixed(
        fixed
      ),
    },
  ];
}

export function generateChartData({ total }: { total: ISalaryTotal }) {
  return [
    {
      name: "Jan",
      total: (total?.card_1?.fixed / total?.card_1?.total_salary)?.toFixed(
        fixed
      ),
    },
    {
      name: "Feb",
      total: (total?.card_1?.kpi / total?.card_1?.total_salary)?.toFixed(fixed),
    },
    {
      name: "Mar",
      total: (total?.card_1?.bonus / total?.card_1?.total_salary)?.toFixed(
        fixed
      ),
    },
    {
      name: "Apr",
      total: (total?.card_1?.correction / total?.card_1?.total_salary)?.toFixed(
        fixed
      ),
    },
  ];
}
