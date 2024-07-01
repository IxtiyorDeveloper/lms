import React, { FC, useMemo, useState } from "react";
import StatisticsCard from "../../../components/statisticsCard";
import { MainContainer, StudentWrapper } from "./style";
import { useNewStudentStatistics } from "hooks";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { useData } from "../hook/useData";
import HorizontalBarChart from "./components/statistics/simpleChart";
import Filter from "../filter";
import { Segmented } from "components";
import { AttendSvg, ColoredAttendSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  data?: any;
}

const date = moment().format("YYYY/MM").split("/");

const NewStudent: FC<IProps> = ({}) => {
  const [activeIndex, setActiveIndex] = useState<string>("1");
  const router = useRouter();
  const { isLoading: totalShareLoading, data: totalShare } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "totalShare",
        ...router.query,
      },
    });
  const { isLoading: notAttendMonthShareLoading, data: notAttendMonthShare } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "notAttendMonthShare",
        ...router.query,
      },
    });
  const { isLoading: notAttendBranchLoading, data: notAttendBranch } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "notAttendBranch",
        ...router.query,
      },
    });
  const { isLoading: notAttendLevelLoading, data: notAttendLevel } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "notAttendLevel",
        ...router.query,
      },
    });
  const { isLoading: notAttendDayLoading, data: notAttendDay } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "notAttendDay",
        ...router.query,
      },
    });
  const { isLoading: notAttendTimeLoading, data: notAttendTime } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "notAttendTime",
        ...router.query,
      },
    });
  const { isLoading: attendBranchShareLoading, data: attendBranchShare } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "attendBranchShare",
        ...router.query,
      },
    });
  const { isLoading: attendLevelLoading, data: attendLevel } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "attendLevel",
        ...router.query,
      },
    });
  const { isLoading: attendDayLoading, data: attendDay } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "attendDay",
        ...router.query,
      },
    });
  const { isLoading: attendTimeLoading, data: attendTime } =
    useNewStudentStatistics({
      query_params: {
        year: router.query?.year || date?.[0],
        month: router.query?.month || date?.[1],
        fields: "attendTime",
        ...router.query,
      },
    });
  const chartData = useData({
    data: {
      totalShare: totalShare?.totalShare,
      notAttendMonthShare: notAttendMonthShare?.notAttendMonthShare,
      notAttendBranch: notAttendBranch?.notAttendBranch,
      notAttendLevel: notAttendLevel?.notAttendLevel,
      notAttendDay: notAttendDay?.notAttendDay,
      notAttendTime: notAttendTime?.notAttendTime,
      attendBranchShare: attendBranchShare?.attendBranchShare,
      attendLevel: attendLevel?.attendLevel,
      attendDay: attendDay?.attendDay,
      attendTime: attendTime?.attendTime,
    },
  });

  const stats = useMemo(() => {
    const realTotal = totalShare?.totalShare;
    const attend = +(
      realTotal?.find((e) => e.label === "NEW_STUDENT_ATTENDED")?.count || 0
    );
    const notAttend = +(
      realTotal?.find((e) => e.label === "NEW_STUDENT_NOT_ATTENDED")?.count || 0
    );
    return {
      attend: attend.toFixed(0),
      notAttend: notAttend.toFixed(0),
    };
  }, [totalShare]);

  return (
    <Spin spinning={false}>
      <StudentWrapper>
        <Filter />
        <HorizontalBarChart {...stats} />
      </StudentWrapper>
      <MainContainer style={{ marginTop: "20px", backgroundColor: "white" }}>
        <Segmented
          options={[
            {
              label: (
                <div className="icon-flex">
                  <AttendSvg width={14} height={14} />
                  Not attended
                </div>
              ),
              value: "1",
            },
            {
              label: (
                <div className="icon-flex">
                  <ColoredAttendSvg width={14} height={14} bgColor="red" />
                  Attended
                </div>
              ),
              value: "2",
            },
          ]}
          onChange={(e: string) => setActiveIndex(e)}
          initValue={activeIndex}
        />
        {activeIndex == "1" ? (
          <div className="item">
            <div className="c-flex">
              <StatisticsCard
                title="By month"
                data={chartData.byMonth() as any}
              />
              <StatisticsCard title="By branch" data={chartData.byBranch()} />
            </div>
            <div className="c-flex">
              <StatisticsCard
                withTab
                title="By level"
                menu={chartData.byLevel()}
                initialTabValue={0}
              />
              <StatisticsCard
                withTab
                title="By days"
                menu={chartData.byDays()}
                initialTabValue={0}
              />
            </div>
            <div className="c-flex">
              <StatisticsCard
                withTab
                title="By time"
                menu={chartData.byTime()}
                initialTabValue={0}
              />
              <div></div>
            </div>
          </div>
        ) : (
          <div className="item">
            <div className="c-flex">
              {/*<StatisticsCard*/}
              {/*  title="By branch"*/}
              {/*  data={chartData.byAMonth() as any}*/}
              {/*/>*/}
              <StatisticsCard title="By branch" data={chartData.byABranch()} />
              <StatisticsCard title="By level" data={chartData.byALevel()} />
            </div>
            <div className="c-flex">
              <StatisticsCard title="By days" data={chartData.byADays()} />
              <StatisticsCard title="By time" data={chartData.byATime()} />
            </div>
            {/*<StatisticsCard title="By month" data={chartData.byAMonth()} />*/}
            {/*<StatisticsCard title="By branch" data={chartData.byABranch()} />*/}
            {/*<StatisticsCard*/}
            {/*  withTab*/}
            {/*  title="By level"*/}
            {/*  menu={chartData.byALevel()}*/}
            {/*/>*/}
            {/*<StatisticsCard*/}
            {/*  withTab*/}
            {/*  title="Attended by days"*/}
            {/*  menu={chartData.byADays()}*/}
            {/*/>*/}
            {/*<StatisticsCard*/}
            {/*  withTab*/}
            {/*  title="By Time"*/}
            {/*  menu={chartData.byATime()}*/}
            {/*/>*/}
          </div>
        )}
      </MainContainer>
    </Spin>
  );
};

export default NewStudent;
