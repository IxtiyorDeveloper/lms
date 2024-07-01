import React, { FC } from "react";
import { SelectYear } from "components";
import { handleNavigateYear } from "utils/handleNavigateYear";
import BarChartE from "../../barChart";
import Chart from "../../pieChart";
import { FirstWrapper } from "./style";
import { useRouter } from "next/router";

interface IProps {
  data1: any;
  data2: any;
  overallBalance: number;
  overallBalanceSpent: number;
}

const ConditionCharts: FC<IProps> = (props) => {
  const router = useRouter();

  const { data1, data2, overallBalance, overallBalanceSpent } = props;

  return (
    <FirstWrapper>
      <div className="year-select">
        <SelectYear
          onChange={(e) => {
            setTimeout(() => {
              handleNavigateYear({ e, router, queryKey: ["year"] });
            }, 300);
          }}
        />
      </div>
      <BarChartE data={data1} />
      <Chart
        data={data2}
        overall_balance={overallBalance}
        overall_balance_spent={overallBalanceSpent}
      />
    </FirstWrapper>
  );
};

export default ConditionCharts;
