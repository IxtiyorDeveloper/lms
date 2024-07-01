import React, { useMemo } from "react";
import Table from "./components/table";
import { WaitingListFilterWrapper } from "./components/filter/style";
import FilterComponent from "./components/filter";
import { PodoCount } from "app/statistics/podo/home/style";
import { useRouter } from "next/router";
import {
  usePageData,
  usePageDataMemo,
  useRedList,
  useRedListStatistics,
} from "hooks";
import { expand } from "./components/table/expand";
import {
  Button,
  FilesSvg,
  FilledSmsSvg,
  labelOptions,
  RedBadgeTitle,
  Segmented,
  TabSupportSvg,
  TabTeacherSvg,
} from "components";
import { Wrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { CheckPermission } from "utils/guard";
import moment from "moment";
import { TYPE_SUPPORT, TYPE_TEACHER } from "constants/teacher";
import BarChartV2 from "./components/barchartV2";
import { useUserLabelSelect } from "utils/functions/userLabelSelect";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";

const RedList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: pageData } = usePageData();
  const endOfMonth = moment().endOf("months");
  const day = endOfMonth.format("D");
  const month = endOfMonth.endOf("months").format("MMMM");
  const month_index = endOfMonth.format("YYYY-MM-");
  const days = useMemo(() => {
    let result: { value: any; label: any }[] = [];

    for (let i = moment().date(); i <= +day; i++) {
      result.push({
        value: month_index + i,
        label: `${i} ${month}`,
      });
    }
    return result;
  }, []);

  const defaultsDates = useMemo(
    () => days.filter((e, index) => index <= 1).map((e) => e.value),
    [days],
  );
  const { activeStudentLabels } = usePageDataMemo();
  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      activeStudentLabels.some((label) => label.value == option.value),
    ),
  );
  const { isLoading, isPreviousData, data } = useRedList({
    body: {
      expand,
      ...router.query,
      left_units_count_from:
        router.query?.left_units_count_from ?? pageData?.redListCountConstant,
      left_units_count_to:
        router.query?.left_units_count_to !== "∞"
          ? router.query?.left_units_count_to
          : null,
      teacherSupportKey: undefined,
      ...filters,
    },
  });
  const value = router.query.teacherSupportKey || TYPE_TEACHER;
  const { data: statisticsData } = useRedListStatistics({
    query_params: {
      expand,
    },
    body: {
      ...router.query,
      left_units_count_from:
        router.query?.left_units_count_from ?? pageData?.redListCountConstant,
      left_units_count_to:
        router.query?.left_units_count_to !== "∞"
          ? router.query?.left_units_count_to
          : null,
      teacherSupportKey: undefined,
      mentor_type: value,
      ...filters,
    },
  });

  const chartData = useMemo(
    () =>
      (statisticsData || []).map((e) => {
        return {
          time: `${e?.full_name}`,
          lost: +e.red_list_student_count,
          avatar: e.avatar,
          phone: e.phone,
        };
      }),
    [statisticsData],
  );

  return (
    <div>
      <WaitingListFilterWrapper>
        <FilterComponent days={days} defaultsDates={defaultsDates} />
      </WaitingListFilterWrapper>
      <WaitingListFilterWrapper mt="20px">
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
                      Teacher
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
                      Support
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
        </div>
        <BarChartV2 withLabel data={chartData} />
      </WaitingListFilterWrapper>
      <Wrapper>
        <PodoCount>
          <RedBadgeTitle title="Red list" count={data?.meta?.totalCount} />
          <div className="buttons">
            <CheckPermission
              permission={[COMPONENTS_VIEWS.can_export_phone_list]}
            >
              <Button
                icon={
                  <FilesSvg width={20} height={20} color={bgColors.black} />
                }
                style={{
                  padding: "0 24px",
                  color: textColors.blueGray,
                  fontWeight: 700,
                  borderRadius: 10,
                  lineHeight: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                onClick={() => {
                  dispatch(
                    toggleModal({
                      key: "redListDownload",
                      data: {
                        data: {
                          filter: "red_list",
                          search: {
                            ...router.query,
                            left_units_count_to:
                              router.query?.left_units_count_to === "∞"
                                ? null
                                : router.query?.left_units_count_to,
                            teacherSupportKey: undefined,
                          },
                        },
                        open: true,
                      },
                    }),
                  );
                }}
              />
            </CheckPermission>
            <CheckPermission permission={[COMPONENTS_VIEWS.send_sms_red_list]}>
              <Button
                icon={<FilledSmsSvg />}
                style={{
                  padding: "0 24px",
                  color: textColors.blueGray,
                  fontWeight: 700,
                  borderRadius: 10,
                  lineHeight: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                onClick={() => {
                  dispatch(
                    toggleModal({
                      key: "groupSms",
                      data: {
                        data: {
                          filter: "red_list",
                        },
                        open: true,
                      },
                    }),
                  );
                }}
              />
            </CheckPermission>
            <CheckPermission permission={[COMPONENTS_VIEWS.can_call_user]}>
              <Button
                icon={<CallSvg width={20} height={20} color={bgColors.white} />}
                style={{
                  backgroundColor: bgColors.midori,
                }}
                onClick={() => {
                  dispatch(
                    toggleModal({
                      key: "autoCall",
                      data: {
                        data: {
                          filter: "red_list",
                        },
                        open: true,
                      },
                    }),
                  );
                }}
              />
            </CheckPermission>
          </div>
        </PodoCount>
        <Table isLoading={isLoading || isPreviousData} data={data} />
      </Wrapper>
    </div>
  );
};

export default RedList;
