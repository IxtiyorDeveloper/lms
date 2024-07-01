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
  CircleImageBlackRedList,
  MyLink,
  Podo,
  StudentLabels,
  StudentTableHeaderIconSvg,
} from "components";
import { EAttendanceStatuses, IFetchList, IGroup, IGroupInfo } from "types";
import { DATE_FORMAT_DD, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import { RowMark, StyledToolTip } from "components/common/useProfile/style";
import { markColors } from "constants/studentRowColor";
import { rowColorsForAcademic } from "constants/rowColors";
import {
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { Badge, Tag } from "antd";
import { cells } from "../cells";
import { IContacts } from "types/contact";
import IndividualMarkCell from "./markCell";
import { currentUnits } from "../utils/sort";
import { IRedList } from "types/absentStudents";
import { queryKeys } from "constants/queryKeys";
import { statusVerify } from "../utils/statusVerify";
import { RED_LIST } from "../../../../../../../../../constants";
import { checkLastMonth } from "../../../../../utils/checkLastMonth";
import UserUnitTooltip from "app/academic-resource/red-list/components/tooltip";

const IndividualColumns: ({
  data,
  lessonDays,
  units,
  studentScores,
  group,
  isLoading,
  disabledActions,
  info,
}: {
  lessonDays?: IGroup;
  data?: IFetchList<IAttendance> | undefined;
  units?: IArsTeacher[];
  studentScores: IProgress[] | undefined;
  group: IGroup | undefined;
  isLoading: boolean;
  disabledActions?: boolean;
  info: IGroupInfo | undefined;
}) => any[] = ({
  data,
  lessonDays,
  units: unsorted,
  studentScores,
  isLoading,
  group,
  disabledActions,
  info
}) => {
  const customUnits: IUnit[] = currentUnits({
    units: unsorted,
    info,
  }) as IUnit[];
  const router = useRouter();
  const studentId = router.query?.studentId;
  const currentDay = moment(new Date()).endOf("day");
  const lessonTime = group?.lessonTime?.time;
  const tab = router.query?.tab || "0";
  const isNexMonth = checkLastMonth();

  const rowLength =
    group?.[isNexMonth ? "allContacts" : "allContactsWithMonth"]?.length ?? 0;

  return useMemo(() => {
    let array: any = [];
    if (customUnits) {
      for (let i = 0; i < (customUnits?.length || 0); i++) {
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
              const isNexMonth = checkLastMonth();

              const contacts = lessonDays?.[
                isNexMonth ? "allContacts" : "allContactsWithMonth"
              ]?.filter((contact) => contact?.user?.id === record?.user?.id);

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
            <div className="right">
              <div className="insideRight">
                <Podo size="small" isOpen />
              </div>
              <div className="podo">PODO</div>
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
          const bgStyles = isCurrent
            ? {}
            : {
                backgroundColor:
                  rowColorsForAcademic?.[
                    record?.status?.toString() as keyof typeof rowColorsForAcademic
                  ],
                opacity:
                  record?.status?.toString() === TRANSFERRED_STUDENT?.toString()
                    ? 0.5
                    : 1,
              };
          const isTransferring =
            record.status?.toString() === TRANSFERRING_STUDENT?.toString();

          const startDate = moment(record?.start_date);
          const startOfNextMonth = moment().startOf("month").add(1, "month");
          const endOfFollowingMonth = moment().endOf("month").add(1, "month");

          const isStartDateNextDate = moment(startDate).isBetween(
            startOfNextMonth,
            endOfFollowingMonth,
            null,
            "[]",
          );

          const isRedList = record?.isRedList;
          const isBlackList = record?.isBlackList;
          const redListCount = (record as IContacts)?.user?.userLabels?.find(
            (l) => l.type == RED_LIST,
          )?.left_units_count;

          return (
            <HeaderStudentWrapper className={isCurrent ? "current-user" : ""}>
              <NameWr style={bgStyles}>
                <div className="nim">
                  <RowMark
                    style={{
                      backgroundColor:
                        markColors[
                          record?.status?.toString() as keyof typeof markColors
                        ],
                    }}
                  />
                  <p className="id">{+rowIndex + 1}</p>
                  <StyledToolTip
                    title={
                      redListCount ? (
                        <UserUnitTooltip redList={record as IRedList} />
                      ) : null
                    }
                    placement="bottomLeft"
                    className="blackTooltip"
                  >
                    <Badge
                      overflowCount={1000}
                      count={redListCount}
                      className="pointer"
                    >
                      <CircleImageBlackRedList
                        src={record?.user?.userProfile?.avatar}
                        alt="avatar"
                        isBlack={isBlackList}
                        isRed={isRedList}
                      />
                    </Badge>
                  </StyledToolTip>
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
                    {isTransferring && (
                      <Tag color={bgColors.deep}>Need ticket</Tag>
                    )}
                    {isStartDateNextDate && isTransferring && (
                      <Tag color={bgColors.secondary}>Next month</Tag>
                    )}
                  </AbsList>
                </MyLink>
              </NameWr>
              <div className="podoWrapper">
                <StudentLabels
                  className="podoLabel"
                  activeLabels={{ podo: true }}
                  data={record}
                  disabledActions={disabledActions}
                  queryKeys={[queryKeys.admin_group_view]}
                />
              </div>
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
    unsorted,
  ]);
};

export default IndividualColumns;
