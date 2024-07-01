import React, { useMemo } from "react";
import moment from "moment/moment";
import {
  LESSON_DAY_HOLIDAY,
  LESSON_DAY_LESSON_DAY,
} from "constants/lessonDayEnums";
import { findClosestToZeroDate } from "utils/findClosesToZero";
import {
  AbsList,
  DateAndUnitWrapper,
  DateYI,
  HeaderStudentWrapper,
  NameWr,
  UnitY,
} from "./style";
import { IAttendance } from "types/attendance";
import { IArsTeacher, IProgress, IUnit } from "types/ars/teacher";
import {
  CircleImage,
  MyLink,
  StudentTableHeaderIconSvg,
} from "components/index";
import { EAttendanceStatuses, IFetchList, IGroup } from "types";
import { DATE_FORMAT_DD, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import { RowMark } from "components/common/useProfile/style";
import { currentUnits } from "../utils/sort";
import { statusVerify } from "../utils/statusVerify";
import { cells } from "../cells";
import IndividualMarkCell from "./markCell";

const IndividualColumns: ({
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
  units: unsorted,
  studentScores,
  isLoading,
  group,
}) => {
  const customUnits: IUnit[] = currentUnits({
    units: unsorted,
    group,
  }) as IUnit[];
  const router = useRouter();
  const studentId = router.query?.studentId;
  const currentDay = moment(new Date()).endOf("day");
  const lessonTime = group?.lessonTime?.time;
  const tab = router.query?.tab || "0";
  const rowLength = group?.allContactsWithMonth?.length ?? 0;

  return useMemo(() => {
    let array: any = [];
    if (customUnits) {
      for (let i = 0; i < customUnits.length; i++) {
        const currentUnit = customUnits?.[i];
        array = [
          ...array,
          {
            title: (
              <DateAndUnitWrapper>
                <DateYI>-</DateYI>
                <UnitY>
                  {currentUnit?.parent_unit?.order}.{currentUnit?.order}
                </UnitY>
              </DateAndUnitWrapper>
            ),
            dataIndex: `${i}`,

            render: (current: any, record: any, rowIndex: number) => {
              const score = studentScores?.filter((score) => {
                if (
                  currentUnit?.group_unit_id == score?.group_unit_id &&
                  score.base_user_id == record?.user?.id
                ) {
                  return score;
                }
              });
              return (
                <IndividualMarkCell
                  score={
                    (score?.length ? score : ["fake filled"]) as IProgress[]
                  }
                  unit={unsorted?.[0]}
                />
              );
            },
          },
        ];
      }
    }
    let customColumns: any = [];
    if (lessonDays?.allDays) {
      let daysWithDiff: any = [];
      for (const [index, [key, value]] of Object.entries(
        lessonDays?.allDays,
      ).entries()) {
        const day = key;
        const endOfDay = moment(day).endOf("day");

        const dayDiff = endOfDay.diff(currentDay, "day");
        if (value.toString() === LESSON_DAY_LESSON_DAY.toString()) {
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

        const currentMonth = moment(new Date()).endOf("month");
        const diff = endOfDay.diff(currentMonth, "months");
        const isLastLesson =
          findClosestToZeroDate({ data: daysWithDiff, lessonTime }) === day;
        customColumns = [
          ...customColumns,
          {
            title: (
              <DateAndUnitWrapper>
                <DateYI
                  isLastLesson={isLastLesson}
                  isHoliday={value.toString() == LESSON_DAY_HOLIDAY.toString()}
                >
                  {moment(day).format("DD MMM")}
                </DateYI>
                <UnitY>
                  {value.toString() == LESSON_DAY_HOLIDAY.toString()
                    ? "Holiday"
                    : "-"}
                </UnitY>
              </DateAndUnitWrapper>
            ),
            dataIndex: `${key}`,
            render: (current: any, record: any, rowIndex: number) => {
              const contacts = lessonDays?.allContactsWithMonth?.filter(
                (contact) => contact?.user?.id === record?.user?.id,
              );

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

              return cells({
                router,
                record,
                status,
                day,
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
        dataIndex: "user",
        fixed: "left",
        render: (current: any, record: any, rowIndex: number) => {
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
                  <p className="id">{+rowIndex + 1}</p>
                  <CircleImage
                    height={40}
                    width={40}
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
                      );
                    })}
                  </AbsList>
                </MyLink>
              </NameWr>
            </HeaderStudentWrapper>
          );
        },
      },
      ...(tab === "0" ? array : customColumns),
    ];
  }, [
    data,
    lessonDays,
    router?.query?.tab,
    customUnits,
    studentScores,
    isLoading,
    group,
    studentId,
  ]);
};

export default IndividualColumns;
