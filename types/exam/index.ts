import { GetExerciseTDO } from "types/exercise";
import { Avatar } from "types/userMe";

export interface IExam {
  conditional_students: number;
  failed_students: number;
  full_absents: number;
  not_checked_students: number;
  partial_absents: number;
  passed_students: number;
  total_students: number;
}

export interface IExamStudenPaperComponentGroup {
  variant_order: number;
  id: number;
  point: number;
  tasks: GetExerciseTDO[];
}

export interface IExamStudenPaperComponent {
  icon_url: string;
  id: number;
  label: string;
  point: number;
  result_point: number;
  recommendation: string;
  recommended_time: number;
  type: number;
  groups: IExamStudenPaperComponentGroup[];
}

export interface IExamStudenPaper {
  icon_url: string;
  id: number;
  label: string;
  point: number;
  recommended_time: number;
  type: number;
  components: IExamStudenPaperComponent[];
}

export type CreteriaTDO = {
  criteria: {
    description: string;
    icon_id: number;
    icon_url: string;
    id: number;
    name: string;
  };
  criteria_id: number;
  id: number;
  point: number;
  task_id: number;
};

export interface IExamStudenResult {
  paper: IExamStudenPaper[];
  max_point: number;
  pass_point: number;
  status: number;
  level: {
    id: number;
    name: string;
  };
  scores: {
    component_id: number;
    criteria: CreteriaTDO[];
    description: string;
    group_id: number;
    max_point: number;
    part_id: number;
    point: number;
    status: any;
    task_id: number;
  }[];
  userProfile: {
    avatar: string;
    fullAvatar: Avatar;
    coins: number;
    current_activity: { id: number; name: string };
    current_unit_id: number;
    first_name: string;
    last_name: string;
    language: string;
    level: number;
    points: number;
    level_name?: string;
  };
}

export interface IExamTaskData {
  id: number;
  type: number;
  media: any[];
  point: number;
  fields: {
    id: number;
    body: string;
    order: number;
    answers: {
      id: number;
      order: number;
      answer: string;
      origin: any;
      options: any[];
    }[];
    contents: [];
  }[];
  options: [];
  criteria: CreteriaTDO[];
  answerKey: string;
  condition: string;
  attributes: {
    maxQuestionCount: number;
    minQuestionCount: number;
    minWordCount: number;
    maxWordCount: number;
  };
  canAutoCheck: boolean;
}

export interface IExamTask {
  id: number;
  data: {
    taskData: IExamTaskData;
  };
  answer?: string;
  point: number;
  part_id: number;
  process_id: number;
  component_id: number;
  max_point: number;
  task_type: number;
  description: any;
  point_status: number;
  exam_status: number;
  criteria_mark: {
    id: number;
    point: number;
  }[];
}

export interface IExamStudent {
  status?: number;
  exam_id: number;
  id: number;
  part_id: any;
  type: number;
  user_id: number;
  process: {
    id: number;
    status: any;
    comment: any;
    attendance_status: number;
    data?: {
      components: {
        component_id: number;
        id: number;
        max_point: number;
        part_id: number;
        point: number;
      }[];
      max_point: number;
      pass_point: number;
      recommended_time: number;
      scores: {
        component_id: number;
        criteria: any[];
        description: string;
        group_id: number;
        max_point: number;
        part_id: number;
        point: number;
        status: any;
        task_id: number;
      }[];
      start_time: number;
      attendance: {
        id: number;
        status: number;
      }[];
    };
    lastDevice: {
      id: number;
      battery: number | null;
    };
  };
  user: {
    id: number;
    userProfile: any;
    studentProfile: {
      avatar: string;
      fullAvatar: Avatar;
      coins: number;
      current_activity: { id: number; name: string };
      current_unit_id: number;
      firstname: string;
      language: string;
      lastname: string;
      level: number;
      points: number;
      level_name?: string;
    };
  };
  tasks: IExamTask[];
  finished_at?: string;
}
