import { IGroupUnits } from "types";
import moment from "moment";
import { IRestructuredUnit } from "../type";
import {
  LESSON_DAY_MAIN_EXAM,
  LESSON_DAY_HOLIDAY,
  LESSON_DAY_LESSON_DAY,
  LESSON_DAY_WOM,
  LESSON_DAY_SPEAKING_EXAM,
} from "../../../../constants/lessonDayEnums";
import React from "react";

export function groupByDate({ units }: { units?: IGroupUnits[] | undefined }) {
  const groupedData: any = {};
  let data: any = [];
  if (units)
    units.forEach((item) => {
      const date = moment(item.date).format("YYYY-MM");
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });

  for (const [key, value] of Object.entries(groupedData)) {
    data = [
      ...data,
      {
        date: key,
        data: value,
      },
    ];
  }
  return data as IRestructuredUnit[];
}

const unitGenerate = ({ item }: { item: IGroupUnits }) => {
  return item?.units?.length ? (
    item?.units?.map((single, unIndex) => {
      return (
        <div className="unit" key={unIndex}>
          {single.parent_unit?.publicOrder}.{single?.publicOrder}
        </div>
      );
    })
  ) : (
    <div className="unit">Exam prep</div>
  );
};
export const headerGenerateForPreview = ({ item }: { item: IGroupUnits }) => {
  const value = item?.status;
  if (value.toString() === LESSON_DAY_LESSON_DAY.toString()) {
    return unitGenerate({ item });
  }
  if (value.toString() === LESSON_DAY_HOLIDAY.toString()) {
    return <div className="unit">Holiday</div>;
  }
  if (value.toString() === LESSON_DAY_MAIN_EXAM.toString()) {
    return <div className="unit">Main</div>;
  }
  if (value.toString() === LESSON_DAY_SPEAKING_EXAM.toString()) {
    return <div className="unit">Speaking</div>;
  }
  if (value.toString() === LESSON_DAY_WOM.toString()) {
    return <div className="unit">WOM</div>;
  }
};
