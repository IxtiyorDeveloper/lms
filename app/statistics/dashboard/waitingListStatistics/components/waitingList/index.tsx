import React, { FC } from "react";
import { CustomTooltip, StudentWrapper } from "./style";
import {
  useByGenderStatistics,
  useByLanguageStatistics,
  useWaitingListStatistics,
} from "hooks";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { useData } from "../hook/useData";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import { MySelect } from "components";
import { useForm } from "react-hook-form";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import StatisticsCard from "../../../components/statisticsCard";
import ByTimeChart from "../../../components/statisticsCard/components/byTime";
import DoubleChart from "../../../components/statisticsCard/components/doubleChart";

interface IProps {
  data?: any;
}

const from_date = moment().startOf("month").format(DATE_FORMAT_YYYY_MM_DD);
const to_date = moment().format(DATE_FORMAT_YYYY_MM_DD);

const WaitingList: FC<IProps> = ({}) => {
  const router = useRouter();

  const { data: waitingBySource } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingBySource",
    },
  });
  const { data: waitingProgress } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingProgress",
    },
  });
  const { data: waitingByBranch } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByBranch",
    },
  });
  const { data: waitingByStatus } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByStatus",
    },
  });
  const { data: waitingByAdmins } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByAdmins",
    },
  });
  const { data: waitingByState } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByState",
    },
  });
  const { data: waitingByHour } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByHour",
    },
  });
  const { data: waitingByWeekDay } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByWeekDay",
    },
  });
  const { data: waitingByLessonTime } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByLessonTime",
    },
  });
  const { data: waitingByLevel } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByLevel",
    },
  });
  const { data: waitingByAge } = useWaitingListStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByAge",
    },
  });
  const { data: waitingByLanguage } = useByLanguageStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByLanguage",
    },
  });
  const { data: waitingByGender } = useByGenderStatistics({
    query_params: {
      ...router.query,
      from_date: router.query.from_date || from_date,
      to_date: router.query.to_date || to_date,
      fields: "waitingByGender",
    },
  });
  // data?.wa;
  const chartData = useData({
    data: {
      waitingBySource: waitingBySource?.waitingBySource,
      waitingByBranch: waitingByBranch?.waitingByBranch,
      waitingByStatus: waitingByStatus?.waitingByStatus,
      waitingByAdmins: waitingByAdmins?.waitingByAdmins,
      waitingByState: waitingByState?.waitingByState,
      waitingByHour: waitingByHour?.waitingByHour,
      waitingByLevel: waitingByLevel?.waitingByLevel,
      waitingByWeekDay: waitingByWeekDay?.waitingByWeekDay,
      waitingByAge: waitingByAge?.waitingByAge,
      waitingByLessonTime: waitingByLessonTime?.waitingByLessonTime,
      waitingProgress: waitingProgress?.waitingProgress,
      waitingByGender: waitingByGender?.waitingByGender,
      waitingByLanguage: waitingByLanguage?.waitingByLanguage,
    },
  });
  const { control, watch } = useForm();

  return (
    <>
      <StudentWrapper>
        <StatisticsCard
          selectNode={
            <MySelect
              style={{ minWidth: 160, marginLeft: "auto", maxWidth: 200 }}
              name="sources"
              control={control}
              placeholder="All sources"
              options={chartData.sourceSelect()}
            />
          }
          title="Created students"
        >
          <StatisticsCard
            children={
              <div style={{ marginTop: "16px" }}>
                <ByTimeChart
                  xAxisVertical
                  customTooltip={(p) => {
                    const data = p.payload?.[0]?.payload;
                    return (
                      <CustomTooltip>
                        <div className="item">
                          <div className="flex">
                            <div className="color" />
                            <div className="child">
                              <div className="title">Created students</div>
                              <div className="count">{data?.lost || 0}</div>
                            </div>
                          </div>
                        </div>
                      </CustomTooltip>
                    );
                  }}
                  barSize={30}
                  isBrush
                  data={chartData.byProgress(watch("sources")) || []}
                  color={bgColors.midori}
                />
              </div>
            }
          />
        </StatisticsCard>
        <div className="flex-container">
          <StatisticsCard title="By source" data={chartData.bySource()} />
          <StatisticsCard title="By branch" data={chartData.byBranch()} />
        </div>
        <div className="flex-container">
          <StatisticsCard title="By status" data={chartData.byStatus()} />
          <StatisticsCard title="By admins" data={chartData.byAdmin()} />
        </div>
        <div className="flex-container">
          <StatisticsCard title="By level" data={chartData.byLevel()} />
          <StatisticsCard title="By age" data={chartData.waitingByAge()} />
        </div>
        <div className="flex-container">
          <StatisticsCard
            title="By native language"
            data={chartData.byLanguage()}
          />
          <StatisticsCard title="By gender" data={chartData.byGender()} />
        </div>
        <StatisticsCard
          withTab
          full
          title="By created time"
          initialTabValue={1}
          menu={chartData.byRegisterTime()}
        />
        <StatisticsCard
          // isTinyBar
          // data={chartData.waitingByLessonTime()}
          title="By lesson time"
          children={
            <div style={{ marginTop: "16px" }}>
              <ByTimeChart
                data={chartData.waitingByLessonTime1() || []}
                color={bgColors.pumpkin}
              />
            </div>
          }
        />
      </StudentWrapper>
    </>
  );
};

export default WaitingList;
