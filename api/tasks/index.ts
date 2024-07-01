import axios from "..";
import {
  IAllTasks,
  IData,
  ISingleTask,
  ITaskAdminCategory,
  ITaskAdminSingleCategory,
  ITaskAdminUser,
  ITaskCategory,
  ITaskEnums,
  ITaskIndex,
  ITaskUsersByDep,
  TParams,
} from "types";

export default {
  taskEnums: (): IData<ITaskEnums> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_get_enums",
    });
  },
  singleTask: (params?: TParams): IData<ISingleTask> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_get_task",
      query_params: {
        id: params?.id,
      },
    });
  },
  singleTaskVew: (params?: TParams): IData<ISingleTask> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_view",
      query_params: {
        id: params?.id,
      },
    });
  },
  tasks: (params?: TParams): IData<ITaskIndex> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_index",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  taskGetTasks: (params?: TParams): IData<IAllTasks> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_task_get_tasks",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  responsibleByBranchAndCategory: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_get_responsible_users",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  canAssignResponsible: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_can_assign_responsible",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  canAssignMySelf: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_can_assign_my_self",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  categories: (): IData<ITaskCategory[]> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_category_get_task_categories",
    });
  },
  taskUsers: (params?: TParams): IData<ITaskUsersByDep[]> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_get_available_roles_for_filter",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  taskAdminUsers: (params?: TParams): IData<ITaskAdminUser[]> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "admin_task_task_category_user_list",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  categoryIndex: (params?: TParams): IData<ITaskAdminCategory[]> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "admin_task_task_category_index",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  singleCategory: (params?: TParams): IData<ITaskAdminSingleCategory> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "admin_task_task_category_view",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  createTaskCategory: (params?: TParams) => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "admin_task_task_category_create",
      body: params?.body,
    });
  },
  createTask: (params?: TParams) => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  updateTask: (params?: TParams) => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  updateTaskCategory: (params?: TParams) => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "admin_task_task_category_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  restoreTaskCategory: (params?: TParams) => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "admin_task_task_category_restore",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  removeTaskCategory: (params?: TParams) => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "admin_task_task_category_delete",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  changeState: (params?: TParams) => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "client_task_change_state",
      body: params?.body,
    });
  },
  getTasks: (params?: TParams): IData<ISingleTask[]> => {
    return axios.post("/v1", {
      project: "task",
      version: "v2",
      action: "admin_task_task_index",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
};
