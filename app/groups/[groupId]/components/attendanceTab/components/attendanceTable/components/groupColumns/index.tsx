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
  ContentStudentWrapper,
  DateAndUnitWrapper,
  DateY,
  HeaderStudentWrapper,
  NameWr,
  PodoContentWrapper,
  PodoHeaderWrapper,
  UnitY,
} from "./style";
import { IAttendance } from "types/attendance";
import { IArsTeacher, IProgress } from "types/ars/teacher";
import {
  MyLink,
  Podo,
  StudentLabels,
  StudentTableHeaderIconSvg,
  CircleImageBlackRedList,
  PotentialFail,
} from "components";
import { EAttendanceStatuses, IFetchList, IGroup } from "types";
import { DATE_FORMAT_DD, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import {
  STOPPING_STUDENT,
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { Badge, Tag, Tooltip } from "antd";
import { RowMark, StyledToolTip } from "components/common/useProfile/style";
import { markColors } from "constants/studentRowColor";
import { rowColorsForAcademic } from "constants/rowColors";
import UserUnitTooltip from "app/academic-resource/red-list/components/tooltip";
import { IRedList } from "types/absentStudents";
import { RED_LIST } from "constants/labels";
import { IContacts } from "types/contact";
import { statusVerify } from "../utils/statusVerify";
import HeaderGenerate from "../utils/headerGenerate";
import { cells } from "../cells";
import { queryKeys } from "constants/queryKeys";
import { checkLastMonth } from "../../../../../utils/checkLastMonth";
import { IExam } from "types/exam/exam";

const GroupColumns: ({
  data,
  lessonDays,
  units,
  studentScores,
  group,
  isLoading,
  disabledActions,
  exam,
}: {
  lessonDays?: IGroup;
  data?: IFetchList<IAttendance> | undefined;
  units?: IArsTeacher[];
  studentScores: IProgress[] | undefined;
  group: IGroup | undefined;
  isLoading: boolean;
  disabledActions?: boolean;
  exam: IExam | undefined;
}) => any[] = ({
  data,
  lessonDays,
  units,
  studentScores,
  isLoading,
  group,
  disabledActions,
  exam,
}) => {
  const router = useRouter();
  const studentId = router?.query?.studentId;
  const currentDay = moment(new Date()).endOf("day");
  const lessonTime = group?.lessonTime?.time;

  const isNexMonth = checkLastMonth();

  const rowLength =
    group?.[isNexMonth ? "allContacts" : "allContactsWithMonth"]?.length ?? 0;

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
                  <p>{HeaderGenerate({ unit, value, group, day, exam })}</p>
                </UnitY>
              </DateAndUnitWrapper>
            ),
            dataIndex: `${key}`,
            key: `${key}`,
            render: (props: any, record: any, rowIndex: number) => {
              const isNexMonth = checkLastMonth();

              const contacts = lessonDays?.[
                isNexMonth ? "allContacts" : "allContactsWithMonth"
              ]?.filter((contact) => contact?.user?.id === record?.user?.id);

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
                disabledActions,
                exam,
              })[value as unknown as keyof typeof cells];
            },
          },
        ];
      }
    }

    return [
      {
        title: (
          <HeaderStudentWrapper>
            <div className="left">
              <StudentTableHeaderIconSvg />
              <p className="student">Student</p>
            </div>
          </HeaderStudentWrapper>
        ),
        accessor: "user",
        key: "main",
        fixed: "left",
        render: (value: any, record: any, index: number) => {
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
            <ContentStudentWrapper className={isCurrent ? "current-user" : ""}>
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
                  <p className="id">{+index + 1}</p>
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
                    {isTransferring && (
                      <Tag color={bgColors.deep}>Need ticket</Tag>
                    )}
                    {isStartDateNextDate && isTransferring && (
                      <Tag color={bgColors.secondary}>Next month</Tag>
                    )}
                    {/*<AcceptStatus status={false} />*/}
                  </AbsList>
                </MyLink>
              </NameWr>
            </ContentStudentWrapper>
          );
        },
      },

      {
        title: (
          <PodoHeaderWrapper padding>
            <div className="right">
              <div className="insideRight">
                <PotentialFail size="small" isOpen />
              </div>
              <div className="podo">P Fail</div>
            </div>
          </PodoHeaderWrapper>
        ),
        accessor: "user",
        key: "potential_fail",
        fixed: "left",
        render: (value: any, record: any, index: number) => {
          const hasPodo =
            record?.status?.toString() !== STOPPING_STUDENT?.toString() &&
            record?.status?.toString() !== TRANSFERRED_STUDENT?.toString();

          return (
            <PodoContentWrapper>
              <div className="podoWrapper">
                <StudentLabels
                  className="podoLabel"
                  disabledActions={disabledActions}
                  activeLabels={{
                    potential_fail: true,
                  }}
                  disabledLabels={{
                    potential_fail: !hasPodo,
                  }}
                  data={record}
                  queryKeys={[queryKeys.admin_group_view]}
                />
              </div>
            </PodoContentWrapper>
          );
        },
      },
      {
        title: (
          <PodoHeaderWrapper padding>
            <div className="right">
              <div className="insideRight">
                <Podo size="small" isOpen />
              </div>
              <div className="podo">PODO</div>
            </div>
          </PodoHeaderWrapper>
        ),
        accessor: "user",
        key: "podo",
        fixed: "left",
        render: (value: any, record: any, index: number) => {
          const hasPodo =
            record?.status?.toString() !== STOPPING_STUDENT?.toString() &&
            record?.status?.toString() !== TRANSFERRED_STUDENT?.toString();

          return (
            <PodoContentWrapper>
              <div className="podoWrapper">
                <StudentLabels
                  className="podoLabel"
                  disabledActions={disabledActions}
                  activeLabels={{
                    podo: true,
                  }}
                  disabledLabels={{
                    podo: !hasPodo,
                  }}
                  data={record}
                  queryKeys={[queryKeys.admin_group_view]}
                />
              </div>
            </PodoContentWrapper>
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
    exam,
  ]);
};

export default GroupColumns;
