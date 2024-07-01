import moment from "moment";

export function getObjectByWeekday({ data }: { data: any }) {
  const date = moment();
  const dayIndex = date?.day();
  if (data) {
    if (
      data?.some((lesson: { lessonWeekDayIndexes: string[] }) =>
        lesson.lessonWeekDayIndexes.some(
          (day) => day?.toString() === dayIndex.toString()
        )
      )
    ) {
      for (const obj of data) {
        if (
          obj?.lessonWeekDayIndexes?.some(
            (day: { toString: () => string }) =>
              day?.toString() === dayIndex.toString()
          )
        ) {
          return obj;
        }
      }
    } else return data[0];
  } else return null;
}
