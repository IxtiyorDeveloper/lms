import React, { FC, useEffect, useMemo } from "react";
import {
  CircleSegment,
  LongCheckSvg,
  MySelect,
  PercentageSvg,
  SelectMonth,
  SwitchControlOffSvg,
  SwitchControlOnSvg,
} from "components/index";
import AttendanceTable from "./components/attendanceTable";
import { IGroup } from "types";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { Wrapper } from "./style";
import {
  useAllAttendance,
  useGetGroupDays,
  useGetStudentScores,
  useGroup,
  usePageDataMemo,
} from "hooks";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import { useForm } from "react-hook-form";
import { bgColors } from "styles/theme";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";
import { getMonthAndYear } from "../../../utils/getFormattedDate";

interface IAttendanceTabItem {
  group: IGroup | undefined;
  initialMonth?: string;
  isLoading: boolean;
}

const tabs = [
  {
    label: "Marks",
    icon: SwitchControlOffSvg,
    query: {
      tab: 0,
    },
    isClickable: true,
  },
  {
    label: "Attendance",
    icon: SwitchControlOnSvg,
    query: {
      tab: 1,
    },
    isClickable: true,
  },
];

const ArchiveAttendanceTabItem: FC<IAttendanceTabItem> = ({
  group,
  initialMonth,
  isLoading,
}) => {
  const { control, watch } = useForm();
  const router = useRouter();
  const tab = router.query?.tab || "0";
  const id = useMemo(
    () => router?.query?.groupId ?? group?.id,
    [router.query, group],
  );

  const { month, year } = getMonthAndYear();

  const {
    data: attendance,
    isInitialLoading: isAttendanceLoading,
    isPreviousData: isAttendancePrevious,
  } = useAllAttendance({
    group_id: id,
    month,
    year,
    expand: "updatedBy",
  });
  const {
    data: lessonDays,
    isInitialLoading: lessonLoading,
    isPreviousData: isLessonPrevious,
  } = useGroup({
    id: id,
    expand: "allDays,allContactsWithMonth.actualPayment,teacher",
    month,
    year,
  });
  const yearMonthFilter =
    group?.groupType?.group_form?.toString() === GROUP_FORM_GROUP?.toString()
      ? {
          year,
          month,
        }
      : {};
  const { data: units, isInitialLoading: unitsLoading } = useGetGroupDays({
    query_params: {
      group: id,
      ...yearMonthFilter,
      expand: "unit, unit.parent_unit",
    },
  });

  const {
    data: studentScores,
    isInitialLoading: isStudentScoresLoading,
    isPreviousData: isStudentScoresPrevious,
  } = useGetStudentScores({
    query_params: {
      group_id: id,
      ...yearMonthFilter,
    },
  });

  const initValue = useMemo(
    () =>
      tabs.findIndex((e) => e.query?.tab?.toString() === router?.query?.tab) >
      -1
        ? tabs.findIndex((e) => e.query?.tab?.toString() === router?.query?.tab)
        : 0,
    [router.query],
  );

  const selects = usePageDataMemo();
  const query = router.query;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "level" && type === "change") {
        router.replace({
          pathname: router.pathname,
          query: {
            ...query,
            level: value.level,
          },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);
  return (
    <Wrapper>
      <div className="mf">
        <CircleSegment
          routerKey="tab"
          options={[
            {
              value: "0",
              icon: (
                <PercentageSvg
                  color={bgColors.white}
                  bgColor={
                    router.query?.tab == "0" || !router.query?.tab
                      ? bgColors.midori
                      : bgColors.harrison
                  }
                />
              ),
            },
            {
              value: "1",
              icon: (
                <LongCheckSvg
                  color={bgColors.white}
                  bgColor={
                    router.query?.tab == "1"
                      ? bgColors.midori
                      : bgColors.harrison
                  }
                />
              ),
            },
          ]}
          initValue={initValue}
          tabPlace="right"
          action={
            group?.groupType?.group_form?.toString() ===
              GROUP_FORM_INDIVIDUAL?.toString() && tab === "0" ? (
              <div className="in-sl">
                <form action="">
                  <MySelect
                    name="level"
                    control={control}
                    options={
                      selects.level.options?.find(
                        (l) =>
                          l.value?.toString() ===
                          group?.level?.parent?.id.toString(),
                      )?.subLevel
                    }
                    defaultValue={{
                      value: group?.level?.id,
                      label: group?.level?.name,
                    }}
                    placeholder="Select"
                  />
                </form>
              </div>
            ) : (
              <div className="month">
                <SelectMonth
                  initValue={moment(initialMonth).format(DATE_FORMAT_MMMM_YYYY)}
                  onChange={(e) =>
                    handleNavigateMonth({ e, router, queryKey: "date" })
                  }
                  nextMonthsCount={3}
                />
              </div>
            )
          }
        />
      </div>
      <AttendanceTable
        attendance={attendance}
        group={group}
        lessonDays={lessonDays}
        isLoading={
          lessonLoading ||
          isLessonPrevious ||
          isAttendanceLoading ||
          isAttendanceLoading ||
          isAttendancePrevious ||
          unitsLoading ||
          isStudentScoresLoading ||
          isStudentScoresPrevious ||
          isLoading
        }
        units={units}
        studentScores={studentScores}
      />
    </Wrapper>
  );
};

export default ArchiveAttendanceTabItem;
