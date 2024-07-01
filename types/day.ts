export interface IDay {
  id: number;
  company_id: number;
  course_id: number;
  name: string;
  status: null | string;
  lessonWeekDayIndexes: string[];
}

export interface IDayCron {
  time_to: string;
  week_day: number;
  time_from: string;
}
