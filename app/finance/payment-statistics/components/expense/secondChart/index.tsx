import React, { FC } from "react";
import { CardWrapper, PWr, WrapperBranches } from "./style";
import { bgColors } from "styles/theme";
import { Tooltip as AntToolTip } from "antd";

const colors = {
  0: {
    chart: "linear-gradient(135deg, #44B26B 24.59%, #91E79E 87.5%)",
    dot: bgColors.midori,
  },
  1: {
    chart: "linear-gradient(270deg, #FA791D 29.64%, #FDBF76 100%)",
    dot: bgColors.orange,
  },
  2: {
    chart: "linear-gradient(270deg, #E92857 0%, #F87C84 100%)",
    dot: bgColors.pop,
  },
  3: {
    chart: bgColors.deep,
    dot: bgColors.deep,
  },
  4: {
    chart: bgColors.cornflower,
    dot: bgColors.cornflower,
  },
  5: {
    chart: bgColors.primary,
    dot: bgColors.primary,
  },
  6: {
    chart: bgColors.purpleCrystal,
    dot: bgColors.purpleCrystal,
  },
  7: {
    chart: bgColors.harrison,
    dot: bgColors.harrison,
  },
  8: {
    chart: bgColors.impression,
    dot: bgColors.impression,
  },
};

const SimpleChart: FC<{
  counts: number[];
  countVisibility: boolean;
  stats?: {
    branchPercentages:
      | { name: string; percentage: string | number }[]
      | undefined;
    total: number;
    bank: { amount: number; percentage: number };
    mot: { amount: number; percentage: number };
  };
}> = ({ stats, countVisibility = true }) => {
  const content = (item: any) => {
    return (
      <PWr>
        <div
          className="dot"
          style={{
            backgroundColor: colors[`${item?.index as keyof typeof colors}`]
              ?.dot as keyof typeof bgColors,
          }}
        ></div>
        {item?.percentage}
      </PWr>
    );
  };
  return (
    <CardWrapper>
      <h3 className="title-card">Branches</h3>
      <div>
        <div className="bar-chart">
          {stats?.branchPercentages?.map((item, index) => {
            return (
              <AntToolTip placement="top" title={content({ ...item, index })}>
                <div
                  className="cash"
                  style={{
                    width: `${item?.percentage}%`,
                    backgroundColor: colors[`${index as keyof typeof colors}`]
                      ?.dot as keyof typeof bgColors,
                  }}
                >
                  {countVisibility && <p>{item?.percentage}%</p>}
                  <div className="bar"></div>
                </div>
              </AntToolTip>
            );
          })}
        </div>
      </div>
      <WrapperBranches>
        {stats?.branchPercentages?.map((branch, index) => {
          return (
            <div className="branch-wrap">
              <div className="branch">
                <div
                  className="dot"
                  style={{
                    backgroundColor: colors[`${index as keyof typeof colors}`]
                      ?.dot as keyof typeof bgColors,
                  }}
                />
                <p className="text">
                  {branch.name}{" "}
                  <span className="grotesk">{branch.percentage}%</span>
                </p>
              </div>
            </div>
          );
        })}
      </WrapperBranches>
    </CardWrapper>
  );
};

export default SimpleChart;
