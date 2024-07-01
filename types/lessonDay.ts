export interface ILessonDay {
  id: number;
  name: string;
  status: null;
  lessonWeeks: ILessonWeek[];
  lessonWeekDayIndexes: string[];
}

export interface ILessonWeek {
  id: number;
  week_day: number | string;
}
