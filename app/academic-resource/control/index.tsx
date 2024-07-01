import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Wrapper } from "./style";
import {
  ChartSvg,
  ForgottenAttendanceSvg,
  HomeWorkNotDoneSvg,
  RedBadgeTitle,
  Segmented,
  SelectMonth,
  TabSupportSvg,
  TabTeacherSvg,
} from "components";
import Filter from "./components/filter";
import { useRouter } from "next/router";
import AcademicControlTable from "./components/table";
import {
  useAcademicControlAttendance,
  useAcademicControlProgress,
  useAcademicControlRedList,
} from "hooks/useAcademicControl";
import { TYPE_SUPPORT, TYPE_TEACHER } from "constants/teacher";
import { bgColors } from "styles/theme";
import BarChartV2 from "./components/barchartV2";
import { WaitingListFilterWrapper } from "./style";
import debounce from "lodash/debounce";
import ProgressFilter from "./components/filter/progressFilter";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import moment from "moment";
import NotDoneFilter from "./components/filter/notDoneFilter";
import { usePageData } from "hooks";

export const tabValues = {
  "1": "1",
  "2": "2",
  "3": "3",
};
const defaultTab = tabValues["3"];
export const routerKey = "segmentId";

const AcademicControl = () => {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const { isLoading: isLoadingPageData } = usePageData();

  const changeWidth = useCallback(
    debounce((e) => {
      setWidth(e?.offsetWidth);
    }, 300),
    []
  );
  const {
    isLoading: attendanceLoading,
    data: attendanceData,
    isFetching: isFetchingAttendance,
  } = useAcademicControlAttendance({
    query_params: {
      ...router.query,
      [routerKey]: undefined,
      teacherSupportKey: undefined,
    },
    enabled:
      !isLoadingPageData &&
      (isFirst || router.query[routerKey] === tabValues["2"]),
    expand: "userProfile.hired_date",
  });
  const { data, isLoading } = useAcademicControlRedList({
    query_params: {
      ...router.query,
      left_units_count_to:
        router.query.left_units_count_to !== "∞"
          ? router.query.left_units_count_to
          : undefined,
      [routerKey]: undefined,
      teacherSupportKey: undefined,
    },
    enabled:
      !isLoadingPageData &&
      (isFirst || router.query[routerKey] === tabValues["1"]),
    expand: "userProfile.hired_date",
  });
  const {
    isLoading: progressLoading,
    data: progressData,
    isFetching,
  } = useAcademicControlProgress({
    body: {
      mode:
        router.query.teacherSupportKey != TYPE_SUPPORT ? "teacher" : "support",
      expand:
        "userProfile.full_avatar,userProfile.phones,group_count,progress,userProfile.hired_date",
      ...router.query,
      ...(!router.query.teacherSupportKey ||
      router.query.teacherSupportKey == "100"
        ? { support_id: undefined }
        : { teacher_id: undefined }),
      [routerKey]: undefined,
      teacherSupportKey: undefined,
    },
    query_params: {
      expand:
        "userProfile.full_avatar,userProfile.phones,group_count,progress,userProfile.hired_date",
    },
    enabled:
      !isLoadingPageData &&
      (isFirst ||
        !router.query[routerKey] ||
        router.query[routerKey] === tabValues["3"]),
  });

  useEffect(() => {
    setTimeout(() => setIsFirst(false), 10000);
  }, []);

  const chartDataAttendance = useMemo(
    () =>
      (attendanceData?.data || [])?.map((e) => {
        return {
          time: `${e?.firstname} ${e?.lastname}`,
          lost: +e.average,
          avatar: e.avatar,
          phone: e.phones?.length > 0 ? e.phones[0].phone_number : "",
        };
      }),
    [attendanceData?.data]
  );
  const chartDataNotDone = useMemo(
    () =>
      (data?.data || [])?.map((e) => {
        return {
          time: `${e?.firstname} ${e?.lastname}`,
          lost: +e.count,
          avatar: e.avatar,
          phone: "",
        };
      }),
    [data?.data]
  );
  const chartData = useMemo(
    () =>
      (progressData?.users || [])?.map((e) => {
        return {
          time: `${e?.userProfile?.firstname} ${e?.userProfile?.lastname}`,
          lost: +e.progress,
          avatar: e.userProfile?.full_avatar || e.userProfile?.avatar,
          phone:
            (e.userProfile?.phones || [])?.find((e: any) => e.is_confirmed == 1)
              ?.phone_number ?? "",
        };
      }),
    [progressData]
  );

  const menu = [
    {
      label: (
        <div className="segment-item">
          <ChartSvg />
          Progress
          <RedBadgeTitle
            count={`${progressData?.avg || 0}%`}
            color={
              +(progressData?.avg || 0) >= 80 ? bgColors.midori : bgColors.pop
            }
          />
        </div>
      ),
      value: tabValues["3"],
    },
    {
      label: (
        <div className="segment-item">
          <HomeWorkNotDoneSvg />
          Homework Not Done
          <RedBadgeTitle
            count={data?.total_count || 0}
            color={
              (data?.total_count || 0) == 0 ? bgColors.midori : bgColors.pop
            }
          />
        </div>
      ),
      value: tabValues["1"],
    },
    {
      label: (
        <div className="segment-item">
          <ForgottenAttendanceSvg />
          Forgotten Attendance
          <RedBadgeTitle
            count={attendanceData?.total_count || 0}
            color={
              (attendanceData?.total_count || 0) == 0
                ? bgColors.midori
                : bgColors.pop
            }
          />
        </div>
      ),
      value: tabValues["2"],
    },
  ];

  const content = {
    [tabValues["1"]]: (
      <Fragment>
        <div className="filter">
          <NotDoneFilter />
        </div>
        <WaitingListFilterWrapper style={{ margin: "10px 0 0 0" }}>
          <div className="header-wrapper">
            <RedBadgeTitle title="Statistics" />
            <div>
              <SelectMonth
                onChange={(e) =>
                  setTimeout(
                    () =>
                      handleNavigateMonth({
                        e,
                        router,
                        queryKey: ["year", "month"],
                      }),
                    300
                  )
                }
                initValue={moment(
                  `${router.query.year || moment().year()} ${
                    router.query.month || moment().month() + 1
                  }`,
                  "YYYY MM"
                ).format("MMMM YYYY")}
              />
            </div>
          </div>
          <BarChartV2
            withLabel
            isLoading={isFetching}
            data={chartDataNotDone}
            isPercent={false}
            isAllRed
          />
        </WaitingListFilterWrapper>
        <div className="table-wrap">
          <AcademicControlTable
            data={data?.data || []}
            isLoading={isLoading}
            width={width}
          />
        </div>
      </Fragment>
    ),
    [tabValues["2"]]: (
      <Fragment>
        <div className="filter">
          <Filter />
        </div>
        <WaitingListFilterWrapper style={{ margin: "10px 0 0 0" }}>
          <div className="header-wrapper">
            <RedBadgeTitle title="Statistics" />
            <div>
              <SelectMonth
                onChange={(e) =>
                  setTimeout(
                    () =>
                      handleNavigateMonth({
                        e,
                        router,
                        queryKey: ["year", "month"],
                      }),
                    300
                  )
                }
                initValue={moment(
                  `${router.query.year || moment().year()} ${
                    router.query.month || moment().month() + 1
                  }`,
                  "YYYY MM"
                ).format("MMMM YYYY")}
              />
            </div>
          </div>
          <BarChartV2
            withLabel
            isLoading={isFetchingAttendance}
            data={chartDataAttendance}
            isPercent={false}
            isAllRed
          />
        </WaitingListFilterWrapper>
        <div className="table-wrap">
          <AcademicControlTable
            data={attendanceData?.data}
            isLoading={attendanceLoading}
            width={width}
          />
        </div>
      </Fragment>
    ),
    [tabValues["3"]]: (
      <Fragment>
        <div className="filter">
          <ProgressFilter />
        </div>
        <WaitingListFilterWrapper style={{ margin: "10px 0 0 0" }}>
          <div className="header-wrapper">
            <RedBadgeTitle title="Statistics" />
            <div>
              <Segmented
                options={[
                  {
                    label: (
                      <div
                        className="tab"
                        style={{
                          color:
                            !router.query?.teacherSupportKey ||
                            router.query?.teacherSupportKey === TYPE_TEACHER
                              ? bgColors.blueGray
                              : bgColors.yourShadow,
                        }}
                      >
                        <TabTeacherSvg
                          color={
                            !router.query?.teacherSupportKey ||
                            router.query?.teacherSupportKey === TYPE_TEACHER
                              ? bgColors.blueGray
                              : bgColors.yourShadow
                          }
                        />
                        Teacher ({progressData?.count.teacher})
                      </div>
                    ),
                    value: TYPE_TEACHER,
                    children: null,
                  },
                  {
                    label: (
                      <div
                        className="tab"
                        style={{
                          color:
                            router.query?.teacherSupportKey === TYPE_SUPPORT
                              ? bgColors.blueGray
                              : bgColors.yourShadow,
                        }}
                      >
                        <TabSupportSvg
                          color={
                            router.query?.teacherSupportKey === TYPE_SUPPORT
                              ? bgColors.blueGray
                              : bgColors.yourShadow
                          }
                        />
                        Support ({progressData?.count.support})
                      </div>
                    ),
                    value: TYPE_SUPPORT,
                    children: null,
                  },
                ]}
                routerKey="teacherSupportKey"
                initValue={
                  (router.query.teacherSupportKey as string) || TYPE_TEACHER
                }
              />
            </div>
            <div>
              <SelectMonth
                onChange={(e) =>
                  setTimeout(
                    () =>
                      handleNavigateMonth({
                        e,
                        router,
                        queryKey: ["year", "month"],
                      }),
                    300
                  )
                }
                initValue={moment(
                  `${router.query.year || moment().year()} ${
                    router.query.month || moment().month() + 1
                  }`,
                  "YYYY MM"
                ).format("MMMM YYYY")}
              />
            </div>
          </div>
          <BarChartV2 withLabel isLoading={isFetching} data={chartData} />
        </WaitingListFilterWrapper>
        <div className="table-wrap">
          <AcademicControlTable
            arsData={progressData?.users}
            isLoading={progressLoading}
            isArsProgress
            width={width}
          />
        </div>
      </Fragment>
    ),
  };

  return (
    <Wrapper ref={changeWidth}>
      <div className="tab-side">
        <Segmented
          routerKey={routerKey}
          initValue={(router.query[routerKey] as string) || defaultTab}
          segmentedWidth="100%"
          options={menu}
        />
      </div>
      {content[(router.query[routerKey] || defaultTab) as keyof typeof content]}
    </Wrapper>
  );
};

export default AcademicControl;
