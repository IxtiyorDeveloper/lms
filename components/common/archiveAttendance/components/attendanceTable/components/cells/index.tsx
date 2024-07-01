import { NextRouter } from "next/router";
import { IArsTeacher, IProgress } from "types/ars/teacher";
import { EAttendanceStatuses, IGroup, TStatuses } from "types";
import { IAttendance } from "types/attendance";
import {
  LESSON_DAY_MAIN_EXAM,
  LESSON_DAY_HOLIDAY,
  LESSON_DAY_LESSON_DAY,
  LESSON_DAY_WOM,
  LESSON_DAY_SPEAKING_EXAM,
} from "constants/lessonDayEnums";
import { HolidaySvg } from "components/index";
import { ExamDateWrapper } from "./style";
import { getCurrentRowSpan, groupDates } from "utils/groupItemsToArray";
import React from "react";
import AttendanceCell from "../attendance";
import { obj } from "../../columns";
import MarkCell from "../markCell";

export const cells = ({
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
}: {
  router: NextRouter;
  record: any;
  score?: (IProgress | "unavailable")[] | undefined;
  status: TStatuses | EAttendanceStatuses;
  day: string;
  unit?: IArsTeacher | undefined;
  attendance: IAttendance | undefined;
  lessonDays: IGroup | undefined;
  rowIndex: number;
  rowLength: number;
  value: { [p: string]: 100 | 200 | 300 };
}) => {
  let lesson_day;
  if (
    !router?.query?.tab?.toString() ||
    router?.query?.tab?.toString() == "0"
  ) {
    lesson_day = (
      <MarkCell
        score={score as IProgress[]}
        status={status}
        day={day}
        unit={unit}
      />
    );
  } else {
    lesson_day = (
      <AttendanceCell
        value={obj[status as keyof typeof obj]}
        id={record?.id}
        attendance={attendance}
        day={day}
      />
    );
  }
  return {
    [LESSON_DAY_LESSON_DAY]: lesson_day,
    [LESSON_DAY_WOM]: lesson_day,
    [LESSON_DAY_MAIN_EXAM]: {
      children: (
        <ExamDateWrapper>
          <HolidaySvg />
          <p>Main</p>
        </ExamDateWrapper>
      ),
      props: {
        rowSpan: getCurrentRowSpan({
          rowIndex,
          rowLength,
          value,
        }),
        colSpan: groupDates({
          data: lessonDays?.allDays,
          desiredValue: LESSON_DAY_MAIN_EXAM,
          targetDate: day,
        }),
      },
    },
    [LESSON_DAY_SPEAKING_EXAM]: {
      children: (
        <ExamDateWrapper>
          <HolidaySvg />
          <p>Speaking</p>
        </ExamDateWrapper>
      ),
      props: {
        rowSpan: getCurrentRowSpan({
          rowIndex,
          rowLength,
          value,
        }),
        colSpan: groupDates({
          data: lessonDays?.allDays,
          desiredValue: LESSON_DAY_SPEAKING_EXAM,
          targetDate: day,
        }),
      },
    },
    [LESSON_DAY_HOLIDAY]: {
      children: (
        <ExamDateWrapper>
          <HolidaySvg />
          <p>Holiday</p>
        </ExamDateWrapper>
      ),
      props: {
        rowSpan: getCurrentRowSpan({
          rowIndex,
          rowLength,
          value,
        }),
        colSpan: groupDates({
          data: lessonDays?.allDays,
          desiredValue: LESSON_DAY_HOLIDAY,
          targetDate: day,
        }),
      },
    },
  };
};
