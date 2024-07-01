import React from "react";
import { IArsTeacher } from "types/ars/teacher";
import {
  LESSON_DAY_MAIN_EXAM,
  LESSON_DAY_HOLIDAY,
  LESSON_DAY_LESSON_DAY,
  LESSON_DAY_WOM,
  LESSON_DAY_SPEAKING_EXAM,
} from "constants/lessonDayEnums";
import { IGroup } from "types";
import { checkDateCurrentMonth } from "utils/checkCurrentMonth";
import { compareDates } from "utils/compareDates";

export const unitGenerate = ({ unit }: { unit: IArsTeacher | undefined }) => {
  return !!unit
    ? unit?.units
        ?.sort((a, b) => {
          if (a.parent_unit.order === b.parent_unit.order) {
            return a.order - b.order;
          } else {
            return a.parent_unit.order - b.parent_unit.order;
          }
        })
        .map((item, index) => {
          if (item)
            return (
              <span key={index}>
                {item?.parent_unit?.order}.{item?.order}
              </span>
            );
          else return "Exam prep";
        })
    : "Exam prep";
};
const HeaderGenerate = ({
  unit,
  value,
  group,
  day,
}: {
  unit: IArsTeacher | undefined;
  value: any;
  group: IGroup | undefined;
  day: string;
}) => {
  if (value.toString() === LESSON_DAY_LESSON_DAY.toString()) {
    const isStartDateCurrentMonth = checkDateCurrentMonth(group?.start_date);

    const isLessonStarted = compareDates({
      date1: day,
      date2: group?.start_date,
    });

    if (isStartDateCurrentMonth) {
      if (isLessonStarted < 0) {
        return "-";
      } else {
        return unitGenerate({ unit });
      }
    } else {
      return unitGenerate({ unit });
    }
  }
  if (value.toString() === LESSON_DAY_HOLIDAY.toString()) {
    return "Holiday";
  }
  if (value.toString() === LESSON_DAY_MAIN_EXAM.toString()) {
    return "Main";
  }
  if (value.toString() === LESSON_DAY_SPEAKING_EXAM.toString()) {
    return "Speaking";
  }
  if (value.toString() === LESSON_DAY_WOM.toString()) {
    return "WOM";
  }
};

export default HeaderGenerate;
