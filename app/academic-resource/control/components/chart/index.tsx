import React from "react";
import moment from "moment";

import { UserItem, Wrapper } from "./style";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import SingleAreaChart from "app/statistics/dashboard/components/statisticsCard/components/singleAreaChart";
import ByTimeChart from "app/statistics/dashboard/components/statisticsCard/components/byTime";
import StatisticsCard from "app/statistics/dashboard/components/statisticsCard";
import RenderPieChart from "app/statistics/dashboard/components/statisticsCard/components/chart";
import { CircleImage } from "components";
import { chartColors } from "styles/theme";
import {
  IAcademicControl,
  IAcademicControlResponse,
  IArsProgress,
  IControlAttendanceData,
} from "types";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import _ from "lodash";

const currentMonth = moment(new Date()).endOf("month").format("DD");

const getProgress = (data: any[], x: string, y: string) => {
  let result: { [x: string]: number }[] = [];
  new Array(+currentMonth).fill(null).map((_, index) => {
    const a =
      data.find(
        (e) =>
          +moment(e.date, DATE_FORMAT_YYYY_MM_DD).format("DD") === index + 1
      )?.count || 0;
    result.push({
      [`${x}`]: index + 1,
      // [`${y}`]: index !== 0 ? result[index - 1]?.[`${y}`] + +a : +a,
      [`${y}`]: +a,
    });
  });

  return result;
};

const getDaily = (data: any[]) => {
  let result: { [x: string]: number }[] = [];
  new Array(+currentMonth).fill(null).map((_, index) => {
    const a =
      data.find(
        (e) => +moment(e.date, DATE_FORMAT_YYYY_MM_DD).format("DD") == index + 1
      )?.count || 0;
    result.push({
      time: index + 1,
      lost: +a,
    });
  });
  return result;
};

export interface IProps {
  users?: IAcademicControl[];
  attendanceUser?: IControlAttendanceData[];
  progressUser?: IArsProgress[];
  chartData?: IAcademicControlResponse["homeWorkNotDoneByDay"];
}
const ControlChart = ({
  chartData,
  users,
  attendanceUser,
  progressUser,
}: IProps) => {
  const user1: any[] = users || attendanceUser || progressUser || [];
  const total = _.sumBy(
    user1.filter((e: any, index: number) => index < 5).map((e) => +e.count),
    (e) => e
  );
  const data = user1
    .filter((e, index) => index < 5)
    .map((user) => {
      const randomElement = new RandomElementOfObject();
      return {
        image: user.avatar_url,
        total: total,
        value: +user.count,
        color: randomElement.getRandomValue(chartColors),
        name: `${user.firstname} ${user.lastname}`,
      };
    });

  const realTotal = [
    {
      label: "Condition",
      children: (
        <div
          style={{
            display: "flex",
            alignSelf: "flex-end",
            justifySelf: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <SingleAreaChart
            data={getProgress(chartData || [], "date", "count")}
            x="date"
            y="count"
            height={400}
          />
        </div>
      ),
    },
    {
      label: "Progress",
      children: <ByTimeChart data={getDaily([]) as any} />,
    },
  ];

  return (
    <Wrapper>
      <div className="progress">
        <StatisticsCard
          containerStyle={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100%",
            padding: "20px",
          }}
          withTab
          title="Total"
          menu={realTotal}
        />
      </div>
      <div className="pie">
        <p className="title">Statistic</p>
        <div
          style={{
            minWidth: "200px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RenderPieChart
            isSectorVisible={false}
            data={data}
            width={180}
            height={150}
            cy={60}
            cx={80}
            innerRadius={40}
            outerRadius={50}
          />
        </div>
        <div className="userWrapper">
          {data.map((item) => {
            return (
              <UserItem color={item.color}>
                <CircleImage />
                <div>
                  <div>asdasdsadsda</div>
                  <div>sadasdasd</div>
                </div>
              </UserItem>
            );
          })}
        </div>
        {/*<Button*/}
        {/*  text={*/}
        {/*    <div className="button-title">*/}
        {/*      Load other staff*/}
        {/*      <RefreshSvg />*/}
        {/*    </div>*/}
        {/*  }*/}
        {/*  bgColor={bgColors.whiteSmoke}*/}
        {/*  textColor={bgColors.soulfulBlue}*/}
        {/*  style={{ width: "100%", margin: "8px 20px 20px 20px" }}*/}
        {/*/>*/}
      </div>
    </Wrapper>
  );
};

export default ControlChart;
