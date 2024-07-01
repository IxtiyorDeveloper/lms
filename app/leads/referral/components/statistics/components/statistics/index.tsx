import React, { FC } from "react";
import Chart from "./components/chart";
import { useReferralStatistics } from "hooks";
import { useRouter } from "next/router";
import { Collapse, CollapseProps, Spin } from "antd";
import moment from "moment";
import { Circle, MainTitle } from "../../chart/style";
import { ChevronDownSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

interface IProps {
  action?: string;
}

const StatisticsComponent: FC<IProps> = ({ action }) => {
  const router = useRouter();

  const { data, isLoading } = useReferralStatistics({
    query_params: {
      status: router.query?.statistic_key || 100,
      from_date: router.query?.start_date_stats,
      year: moment(router.query?.start_date_stats).year(),
      to_date: router.query?.end_date_stats,
    },
  });

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <MainTitle>
          <h4>Statistics</h4>
        </MainTitle>
      ),
      children: (
        <Chart
          approvals={data}
          invites={data}
          financeData={
            data
              ?.map((financeD) => {
                const month = moment(
                  financeD.month < 10 ? `0${financeD.month}` : financeD.month,
                  "MM",
                ).format("MMM");
                return {
                  date: `${month} ${financeD.year}`,
                  green_balance: financeD.green_balance,
                  total_balance: financeD.total_balance,
                  current_balance:
                    financeD.total_balance - financeD.current_balance,
                  total_balance_unreal:
                    financeD.total_balance -
                    (financeD.total_balance - financeD.current_balance),
                };
              })
              ?.sort((a, b) =>
                moment(a.date, "MMM YYYY").diff(moment(b.date, "MMM YYYY")),
              ) || []
          }
        />
      ),
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <Collapse
        items={items}
        expandIconPosition="start"
        bordered={false}
        ghost
        accordion={false}
        expandIcon={({ isActive }) => (
          <Circle active={!!isActive}>
            <ChevronDownSvg color={bgColors.black} width={18} height={18} />
          </Circle>
        )}
      />
    </Spin>
  );
};

export default StatisticsComponent;
