import React, { useEffect, useState } from "react";
import { CustomTooltipWrapper, RightElemenets, Wrapper } from "./style";
import { ITabs } from "./type";
import BarChartV2 from "../barchart";
import { Segmented } from "components";
import AverageScoreCalculatedInfo from "../averageCalculatedInfo";
import { bgColors } from "styles/theme";
import DoubleChart from "../doubleChart";
import moment from "moment";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { Spin } from "antd";
import { useRouter } from "next/router";

export enum ChartTabKey {
  APPROVALS = "100",
  INVITES = "200",
  FINANCE = "300",
}

const Chart = ({ approvals, invites, financeData }: ITabs) => {
  const router = useRouter();

  const options = [
    {
      value: ChartTabKey.APPROVALS,
      label: "Approvals",
      children: (
        <div
          style={{
            height: "400px",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <BarChartV2
            data={approvals ?? []}
            chartBg={`linear-gradient(to bottom, #42BD6E 0%, #7AE7A1 100%)`}
          />
        </div>
      ),
    },
    {
      value: ChartTabKey.INVITES,
      label: "Invites",
      children: (
        <div
          style={{
            height: "400px",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <BarChartV2
            data={invites ?? []}
            chartBg={`linear-gradient(to bottom, #42BD6E 0%, #7AE7A1 100%)`}
          />
        </div>
      ),
    },
    {
      value: ChartTabKey.FINANCE,
      label: "Finance",
      children: (
        <Spin spinning={!financeData?.length}>
          <div
            style={{
              height: "400px",
            }}
          >
            <DoubleChart
              customTooltip={(e) => {
                return Array.isArray(e.payload) ? (
                  <CustomTooltipWrapper>
                    <div className="part">
                      <p className="title">
                        <div className="dot" />
                        Income by referrals
                      </p>
                      <p className="ml-amount">
                        {toCurrencyFormat(
                          +e?.payload[0]?.payload?.green_balance,
                        )}
                      </p>
                    </div>
                    <div className="part">
                      <p className="title">
                        <div className="dot" />
                        Potential expense
                      </p>
                      <p className="ml-amount">
                        {toCurrencyFormat(
                          +e?.payload[0]?.payload?.total_balance,
                        )}
                      </p>
                    </div>
                    <div className="part">
                      <p className="title">
                        <div className="dot" />
                        Real expense
                      </p>
                      <p className="ml-amount">
                        {toCurrencyFormat(
                          +e?.payload[0]?.payload?.current_balance,
                        )}
                      </p>
                    </div>
                  </CustomTooltipWrapper>
                ) : null;
              }}
              color1={bgColors.emerald}
              color2={bgColors.fond}
              color2Part1={bgColors.pop}
              color2Part2={bgColors.fond}
              name1="green_balance"
              name2="total_balance"
              name2Part1="current_balance"
              name2Part2="total_balance_unreal"
              xAxisName="date"
              data={financeData}
            />
          </div>
        </Spin>
      ),
    },
  ];

  return (
    <Wrapper>
      <RightElemenets>
        <AverageScoreCalculatedInfo />
      </RightElemenets>
      <Segmented
        options={options}
        routerKey="statistic_key"
        initValue={
          (router.query?.statistic_key as string) || ChartTabKey.APPROVALS
        }
      />
    </Wrapper>
  );
};

export default Chart;
