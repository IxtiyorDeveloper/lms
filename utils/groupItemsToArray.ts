import {
  LESSON_DAY_MAIN_EXAM,
  LESSON_DAY_HOLIDAY,
  LESSON_DAY_SPEAKING_EXAM,
} from "../constants/lessonDayEnums";

export const getCurrentRowSpan = ({
  rowIndex,
  value,
  rowLength,
}: {
  rowIndex: number;
  value: any;
  rowLength: number;
}) => {
  if (
    value.toString() == LESSON_DAY_HOLIDAY.toString() ||
    value.toString() == LESSON_DAY_MAIN_EXAM.toString() ||
    value.toString() == LESSON_DAY_SPEAKING_EXAM.toString()
  ) {
    if (rowIndex === 0) {
      return rowLength;
    } else return 0;
  } else return 1;
};

export function groupDates({
  data,
  desiredValue,
  targetDate,
}: {
  data?: { [x: string]: any };
  desiredValue: number;
  targetDate: string;
}) {
  const groupedDates = [];

  let currentCollector: any[] = [];
  if (data) {
    const keys = Object.keys(data);
    const numKeys = keys.length;
    for (let i = 0; i < numKeys; i++) {
      const currentKey = keys[i];
      const currentValue = data[currentKey];
      if (currentValue?.toString() === desiredValue?.toString()) {
        currentCollector = [
          ...currentCollector,
          {
            day: currentKey,
            index: i,
          },
        ];
      } else {
        if (currentCollector.length > 0) {
          groupedDates.push(currentCollector);
        }
        currentCollector = [];
      }
      if (numKeys - 1 === i && currentCollector.length > 0) {
        groupedDates.push(currentCollector);
      }
    }
  }

  for (const innerArray of groupedDates) {
    const matchingEntry = innerArray.find(
      (entry: { day: any }) => entry.day === targetDate,
    );

    if (matchingEntry) {
      if (innerArray?.[0]?.day === targetDate) return innerArray.length;
      else return 0;
    }
  }
  return 1; // Return 0 if the target date is not found in any inner array
}
