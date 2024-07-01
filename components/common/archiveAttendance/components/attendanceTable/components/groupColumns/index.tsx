import React, { useMemo } from "react";
import moment from "moment/moment";
import {
  LESSON_DAY_HOLIDAY,
  LESSON_DAY_LESSON_DAY,
  LESSON_DAY_MAIN_EXAM,
  LESSON_DAY_SPEAKING_EXAM,
} from "constants/lessonDayEnums";
import { findClosestToZeroDate } from "utils/findClosesToZero";
import {
  AbsList,
  DateAndUnitWrapper,
  DateY,
  HeaderStudentWrapper,
  NameWr,
  UnitY,
} from "./style";
import { IAttendance } from "types/attendance";
import { IArsTeacher, IProgress } from "types/ars/teacher";
import {
  MyLink,
  StudentTableHeaderIconSvg,
  CircleImage,
} from "components/index";
import { EAttendanceStatuses, IFetchList, IGroup } from "types";
import { DATE_FORMAT_DD, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import { Tooltip } from "antd";
import { RowMark } from "components/common/useProfile/style";
import { statusVerify } from "../utils/statusVerify";
import HeaderGenerate from "../utils/headerGenerate";
import { cells } from "../cells";

const GroupColumns: ({
  data,
  lessonDays,
  units,
  studentScores,
  group,
  isLoading,
}: {
  lessonDays?: IGroup;
  data?: IFetchList<IAttendance> | undefined;
  units?: IArsTeacher[];
  studentScores: IProgress[] | undefined;
  group: IGroup | undefined;
  isLoading: boolean;
}) => any[] = ({
  data,
  lessonDays,
  units,
  studentScores,
  isLoading,
  group,
}) => {
  const router = useRouter();
  const studentId = router?.query?.studentId;
  const currentDay = moment(new Date()).endOf("day");
  const lessonTime = group?.lessonTime?.time;
  const rowLength = group?.allContactsWithMonth?.length ?? 0;
  return useMemo(() => {
    let customColumns: any = [];
    if (lessonDays?.allDays) {
      let daysWithDiff: any = [];
      for (const [index, [key, value]] of Object.entries(
        lessonDays?.allDays,
      ).entries()) {
        const day = key;
        const endOfDay = moment(day).endOf("day");

        const dayDiff = endOfDay.diff(currentDay, "day");
        if (value.toString() == LESSON_DAY_LESSON_DAY.toString()) {
          daysWithDiff = [
            ...daysWithDiff,
            {
              day,
              diff: dayDiff,
            },
          ];
        }
      }

      for (const [index, [key, value]] of Object.entries(
        lessonDays?.allDays,
      ).entries()) {
        const day = key;
        const endOfDay = moment(day).endOf("day");
        const unit = units?.find(
          (unit) => moment(unit.date).endOf("day").diff(endOfDay, "day") === 0,
        );

        const currentMonth = moment(new Date()).endOf("month");
        const diff = endOfDay.diff(currentMonth, "months");
        const isLastLesson =
          findClosestToZeroDate({ data: daysWithDiff, lessonTime }) === day;

        customColumns = [
          ...customColumns,
          {
            title: (
              <DateAndUnitWrapper>
                <DateY
                  isLastLesson={isLastLesson}
                  isHoliday={
                    value.toString() == LESSON_DAY_HOLIDAY.toString() ||
                    value.toString() == LESSON_DAY_MAIN_EXAM.toString() ||
                    value.toString() == LESSON_DAY_SPEAKING_EXAM.toString()
                  }
                >
                  {moment(day).format("DD MMM")}
                </DateY>
                <UnitY>
                  <p>{HeaderGenerate({ day, group, unit, value })}</p>
                </UnitY>
              </DateAndUnitWrapper>
            ),
            dataIndex: `${key}`,
            render: (props: any, record: any, rowIndex: number) => {
              const contacts = lessonDays?.allContactsWithMonth?.filter(
                (contact) => contact?.user?.id === record?.user?.id,
              );
              const user_id = record?.user?.id;

              const attendance = data?.list?.find(
                (attendance: IAttendance) =>
                  attendance?.date === day &&
                  attendance?.user_id == record?.user?.id,
              );
              let status = statusVerify({
                attendance,
                day,
                contacts,
                diff,
              });

              const score = studentScores?.filter((score) => {
                if (
                  unit?.units?.some(
                    (un) => un.group_unit_id == score?.group_unit_id,
                  ) &&
                  score.base_user_id == user_id
                ) {
                  return score;
                }
              });

              return cells({
                router,
                record,
                score,
                status,
                day,
                unit,
                attendance,
                lessonDays,
                rowIndex,
                rowLength,
                value,
              })[value as unknown as keyof typeof cells];
            },
          },
        ];
      }
    }

    return [
      {
        title: (
          <HeaderStudentWrapper padding>
            <div className="left">
              <StudentTableHeaderIconSvg />
              <p className="student">Student</p>
            </div>
          </HeaderStudentWrapper>
        ),
        accessor: "user",
        fixed: "left",
        render: (value: any, record: any, index: number) => {
          const negativeAttendanceList = data?.list?.filter(
            (attendance) =>
              attendance?.user_id == record?.user?.id &&
              (attendance?.status === EAttendanceStatuses.ABS ||
                attendance?.status === EAttendanceStatuses.NOT_CAME),
          );
          const isCurrent = record?.user?.id == studentId;

          return (
            <HeaderStudentWrapper className={isCurrent ? "current-user" : ""}>
              <NameWr>
                <div className="nim">
                  <RowMark />
                  <p className="id">{+index + 1}</p>
                  <CircleImage
                    src={record?.user?.userProfile?.avatar}
                    alt="avatar"
                  />
                </div>
                <MyLink
                  href={{
                    pathname: `/student/${record?.user?.id}`,
                    query: router.query,
                  }}
                  scroll={false}
                >
                  <p className="full_name">
                    {record?.user?.userProfile?.firstname + " "}
                    {record?.user?.userProfile?.lastname}{" "}
                    {`(${moment().diff(
                      moment(
                        record?.user?.userProfile?.dob,
                        DATE_FORMAT_YYYY_MM_DD,
                      ),
                      "years",
                    )})`}
                  </p>
                  <AbsList>
                    {negativeAttendanceList?.map((item, key) => {
                      const bgColor = {
                        [EAttendanceStatuses.ABS]: bgColors.primary,
                        [EAttendanceStatuses.NOT_CAME]: bgColors.pop,
                      };
                      return (
                        <Tooltip
                          destroyTooltipOnHide
                          trigger="hover"
                          placement="top"
                          title={item?.reason}
                        >
                          <div
                            className="num"
                            key={key}
                            style={{
                              backgroundColor:
                                bgColor[item?.status as keyof typeof bgColor],
                            }}
                          >
                            {moment(item?.date).format(DATE_FORMAT_DD)}
                          </div>
                        </Tooltip>
                      );
                    })}
                  </AbsList>
                </MyLink>
              </NameWr>
            </HeaderStudentWrapper>
          );
        },
      },
      ...customColumns,
    ];
  }, [
    data,
    lessonDays,
    router?.query?.tab,
    units,
    studentScores,
    isLoading,
    group,
    studentId,
  ]);
};

export default GroupColumns;
