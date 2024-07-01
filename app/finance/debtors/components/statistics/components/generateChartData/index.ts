import { IStatistics } from "./type";

export const generateChartData = ({ data }: IStatistics) => {
  const balance = +(data?.total_balance || 0);
  const debts = +(data?.total_debt || 0);
  const overall = +(data?.total_balance || 0) + +(data?.total_debt || 0);
  const payed_percentage = Number(((balance * 100) / overall).toFixed(2));
  const debts_percentage = Number(((debts * 100) / overall).toFixed(2));
  return [
    {
      percentage: payed_percentage,
      color: "linear-gradient(270deg, #2AB44C 0%, #70D088 100%)",
      label: `Payed: ${payed_percentage}%`,
    },
    {
      percentage: debts_percentage,
      color: "linear-gradient(270deg, #E92857 0%, #F14852 100%)",
      label: `Total debtors: ${debts_percentage}%`,
    },
  ];
};
