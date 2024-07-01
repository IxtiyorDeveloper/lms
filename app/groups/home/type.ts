export interface IFilter {
  general: {
    name?: string;
    branch_id?: number | string;
    start_date?: string;
    state?: number | string;
    group_type_id?: number | string;
    course_id?: number | string;
    room_id?: number | string;
    parent_level_id?: number | string | null;
    level_id?: number | string;
    lesson_day_id?: number | string;
    lesson_time_id?: number | string;
    teacher_id?: number | string;
    support_id?: number | string;
    responsible_id?: number | string;
    study_type?: number | string;
    closing_reason?: number | string;
  };
}
