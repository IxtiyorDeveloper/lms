export type TObj = {
  [key: string]: any;
};

export type TColorObj = {
  [key: string]: {
    ACTIVE_BOX: string;
    ACTIVE_LINE: string;
    PASSIVE_BOX: string;
    PASSIVE_LINE: string;
  };
};

export type ITaskEnums = {
  TaskStateEnum: TObj;
  TaskStatusColorEnum: TColorObj;
  TaskStatusEnum: TObj;
  TaskUserTypeEnum: TObj;
  TaskStatusValues: number[];
};

export interface ITRole {
  allowed: boolean;
  status: number;
}

export interface IRoleObj {
  canDone: ITRole;
  canNotDone: ITRole;
  canProcess: ITRole;
  canRated: ITRole;
  canReject: ITRole;
}

export interface ITaskFile {
  base_url: string;
  name: string;
  order: null | number;
  path: string;
  size: number;
  type: string;
  url: string;
}

export interface ITask {
  branch: string;
  can_assign_responsible: boolean;
  categoryName: string;
  complaint_info: string | null;
  created_at: string;
  creator: string;
  creator_avatar: {};
  description: string;
  id: number;
  point: number | null | string;
  roles: IRoleObj;
  state: number;
  status: number;
  taskFiles: ITaskFile[];
  updated_at: string;
}

export interface IStatistic {
  count: number;
  status: number;
}

export interface IAllTasks {
  next_page: number;
  status: number;
  tasks: ITask[];
  total: number;
}

export interface ITaskIndex {
  all_tasks: IAllTasks[];
  statistics: IStatistic[];
  total?: string;
  next_page?: number | null;
}

export interface IResponsible {
  id: number;
  name: string;
}

export interface IBranchObj {
  id: number;
  name: string;
}

export interface ICategoryObj {
  id: number;
  name: string;
}

export interface IAvatar {
  path: string;
  base_url: string;
  full_url: string;
  resolution: string;
}

export interface IUserProfile {
  user_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  avatar_path: string;
  avatar_base_url: string;
  locale: string;
  gender: number;
  avatar_children: IAvatar[] | null;
}

export interface ITaskUserObj {
  user_id: number;
  user_type: number;
  user_type_str: string;
  profile: IUserProfile;
}

export interface ITaskUserByDep {
  id: number | string;
  name: string;
  role_id: string | number;
}

export interface ITaskUsersByDep {
  id: number | string;
  name: string;
  users: ITaskUserByDep[];
}

export interface IHistoryObj {
  datetime: string;
  status: number;
  description: string;
  data: {
    to: string;
    from: string;
  };
  taskFiles: ITaskFile[];
  user: string;
  avatar: string;
  role: string;
}

export interface ISingleTask {
  id: number;
  description: string;
  status: number;
  deadline: string | null;
  created_at: string;
  branch: string;
  responsible: IResponsible[];
  branch_object: IBranchObj;
  taskUsers: ITaskUserObj[];
  category: ICategoryObj;
  taskFiles: ITaskFile[];
  roles: IRoleObj;
  history: IHistoryObj[];
  state: number;
  categoryName: string;
  creator: string;
  can_assign_responsible: boolean;
  department_id: number;
  point: number | null;
  complaint_info: string | null;
}

export interface IGradient {
  to_color: string;
  from_color: string;
}

export interface ITaskCategory {
  id: number;
  name: string;
  order: number;
  iconUrl: string;
  description: string;
  color: IGradient;
  department_id: number;
  can_assign_responsible: boolean;
}

export interface ITaskAdminTaskCategory {
  id: number;
  name: string;
  color: {
    to_color: string;
    from_color: string;
  };
  order: number | null;
  description: string;
  department_id: number;
  iconUrl: string;
  can_assign_responsible: boolean;
}

export interface ITaskAdminTaskStatistics {
  "100": string | number;
  "500": string | number;
  "700": string | number;
  "900": string | number;
  count_responsible: string | number;
  count_task_manager: string | number;
  avg_point: number | string;
}

export enum ETaskState {
  "ON_CREATED" = 100,
  "ON_ASSIGN" = 200,
  "ON_STOP_PROCESS" = 200,
  "ON_PROCESS" = 300,
  "ON_DONE" = 500,
  "ON_CHECKED" = 600,
  "ON_IMPOSSIBLE" = 800,
}

export enum ETaskStatus {
  OPENED = "100",
  DONE = "500",
  CHECKED = "700",
  REJECTED = "900",
}

export interface ITaskAdminCategory {
  task_category: ITaskAdminTaskCategory;
  statistics: ITaskAdminTaskStatistics;
}

export interface ITaskAdminSingleCategory {
  id: number;
  name: string;
  from_color: string;
  to_color: string;
  icon: string;
  order: number;
  description: string;
  responsible_roles: string[] | number[];
  supervisor_roles: string[] | number[];
}

export interface ITaskAdminUser {
  status: {
    "100": number;
    "500": number;
    "700": number;
    "900": number;
  };
  user: {
    fullName: string;
    role_name: string;
    avatar: {
      full_url: string;
      children: IAvatar[];
    };
    role_id: number;
  };
}
export enum TaskUserType {
  MyTask = 100,
  AssignedTasks = 200,
}
