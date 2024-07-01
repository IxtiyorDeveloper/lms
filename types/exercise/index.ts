export type GetExerciseTDO = {
  answerKey: string;
  attributes: {
    answerBlockType: string;
    minOptionCount: number;
    maxOptionCount: number;
    hasOptions: number;
    unlockedLetterCount?: number;
    type?: string;
    showType?: string;
  };
  canAutoCheck: true;
  condition: string;
  criteria: IExerciseTaskCreteria[];
  fields?: GetExerciseField[];
  id: number;
  media: ImageType[];
  file_url?: string;
  options: {
    order: number;
    value: string;
  }[];
  point: null;
  type: number;
  order: number;
  userAnswer?: string;
  score?: {
    component_id: number;
    criteria: [];
    description: string;
    group_id: number;
    max_point: number;
    part_id: number;
    point: number;
    status: number;
    task_id: number;
  };
};
export interface IExerciseTaskCreteria {
  criteria_id: number;
  id: number;
  point: number;
  point_result: number;
  task_id: number;
  criteria: {
    description: string;
    icon_id: number;
    icon_url: string;
    id: number;
    name: string;
  };
}
export type GetExerciseField = {
  answers: ExerciseTDO[];
  body: string;
  contents: any[];
  id: number;
  order: number;
  version: number;
  options: {
    id: number;
    order: number;
    value: string;
  }[];
};
export type ExerciseTDO = {
  answer: string;
  id: number;
  options: {
    id: number;
    order: number;
    value: string;
  }[];
  order: number;
  origin: string;
  userAnswer?: string;
  feedback: string;
  userOptions?: {
    value: string;
  }[];
  status?: number;
};
export type ImageType = {
  file_base_url: string;
  file_path: string;
  id: number;
  images: {
    original: string;
    medium: string;
    small: string;
  };
  media_url: string;
  name: string;
  parent_id: any;
  task_id: number;
  task_part_id: any;
  type: number;
  value: string;
};
