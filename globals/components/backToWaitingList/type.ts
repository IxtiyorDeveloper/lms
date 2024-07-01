export interface IBackToWaitingList {
  general: {
    note: string;
    course_id: null;
    group_type_id: number;
    level_id: number;
    parent_level_id: number;
    lesson_day_ids: number[];
    lesson_time_ids: number[];
    branch_id: number;
  };
}
