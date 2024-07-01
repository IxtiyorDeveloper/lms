export interface ISByAverageAmountOfStudents {
  max_count: string;
  actual_count: number;
  label: string;
}

export interface ISByStatus {
  count: number;
  label: string;
  state: string;
}

export interface ISByGroupType {
  count: number;
  label: string;
  group_type_id: string;
}

export interface ISByLessonDay {
  count: number;
  label: string;
  group_type_id: string;
}

export interface ISByTime {
  count: number;
  label: string;
  group_type_id: string;
}

export interface ISBySubLevel {
  count: number;
  label: string;
  name: string;
}

export interface ISByStudentCount {
  label: string;
  num_groups: number;
  num_students: number | null;
}

export interface IStatisticsGroups {
  byAverageAmountOfStudent: ISByAverageAmountOfStudents[];
  byStatus: ISByStatus[];
  byActiveStatus: ISByStatus[];
  byGroupType: ISByGroupType[];
  byStudentCount: ISByStudentCount[];
  byBranch: ISByGroupType[];
  byLessonDay: ISByLessonDay[];
  byLevel: ISByLessonDay[];
  bySubLevel: ISBySubLevel[];
  byLessonTime: ISByTime[];
}
