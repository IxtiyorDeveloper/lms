import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { ITaskIndex, TParams, TUpdateFunctions } from "types";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import tasks from "api/tasks";

export const getTaskEnums = async () => {
  try {
    const res = await tasks.taskEnums();
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getSingleTask = async (params?: TParams) => {
  try {
    const res = await tasks.singleTask(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getSingleTaskView = async (params?: TParams) => {
  try {
    const res = await tasks.singleTaskVew(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getTaskIndex = async (params?: TParams) => {
  try {
    const res = await tasks.tasks(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getTaskGetTasks = async (params: TParams, e: any) => {
  try {
    const res = await tasks.taskGetTasks({
      ...params,
      query_params: {
        ...params?.query_params,
        page: e.pageParam ?? 1,
      },
    });
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getResponsibleByBranchAndCategory = async (params?: TParams) => {
  try {
    const res = await tasks.responsibleByBranchAndCategory(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getCheckCanAssignResponsible = async (params?: TParams) => {
  try {
    const res = await tasks.canAssignResponsible(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getCheckCanAssignMySelf = async (params?: TParams) => {
  try {
    const res = await tasks.canAssignMySelf(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getTaskCategories = async () => {
  try {
    const res = await tasks.categories();
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getTaskUsers = async (params?: TParams) => {
  try {
    const res = await tasks.taskUsers(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getAdminTaskUsers = async (params?: TParams) => {
  try {
    const res = await tasks.taskAdminUsers(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getTasks = async (params?: TParams) => {
  try {
    const res = await tasks.getTasks(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getTaskCategoryIndex = async (params?: TParams) => {
  try {
    const res = await tasks.categoryIndex(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getSingleTaskCategory = async (params?: TParams) => {
  try {
    const res = await tasks.singleCategory(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const createTaskCategory = async (params?: TParams) => {
  try {
    const res = await tasks.createTaskCategory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const updateTaskCategory = async (params?: TParams) => {
  try {
    const res = await tasks.updateTaskCategory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const createTask = async (params?: TParams) => {
  try {
    const res = await tasks.createTask(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const updateTask = async (params?: TParams) => {
  try {
    const res = await tasks.updateTask(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const restoreTaskCategory = async (params?: TParams) => {
  try {
    const res = await tasks.restoreTaskCategory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const removeTaskCategory = async (params?: TParams) => {
  try {
    const res = await tasks.removeTaskCategory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const changeStatus = async (params?: TParams) => {
  try {
    const res = await tasks.changeState(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

/* /----- hooks -----/ */
/* /----- hooks -----/ */
/* /----- hooks -----/ */

export const useTaskEnums = () => {
  return useQuery([queryKeys.task_enums], () => getTaskEnums(), {
    keepPreviousData: true,
  });
};

export const useSingleTask = (params?: TParams) => {
  return useQuery(
    [queryKeys.task_single, params],
    () => getSingleTask(params),
    {
      enabled: !!params?.id,
      keepPreviousData: false,
    }
  );
};

export const useSingleTaskView = (params?: TParams) => {
  return useQuery(
    [queryKeys.task_view, params],
    () => getSingleTaskView(params),
    {
      enabled: !!params?.id,
      keepPreviousData: false,
    }
  );
};

export const useTaskCategories = () => {
  return useQuery([queryKeys.task_categories], () => getTaskCategories(), {
    keepPreviousData: true,
  });
};

export const useGetUsers = (params?: TParams) => {
  return useQuery([queryKeys.task_users, params], () => getTaskUsers(params), {
    keepPreviousData: true,
    enabled: !!params?.query_params?.user_type,
  });
};

export const useGetAdminUsers = (params?: TParams) => {
  return useQuery(
    [queryKeys.task_admin_users, params],
    () => getAdminTaskUsers(params),
    {
      enabled: !!params?.query_params?.user_type,
    }
  );
};

export const useTasks = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_task_task_index, params],
    () => getTasks(params),
    {
      enabled: !!params?.enabled,
    }
  );
};

export const useTaskCategoryIndexAdmin = (params?: TParams) => {
  return useQuery(
    [queryKeys.task_admin_category_index, params],
    () => getTaskCategoryIndex(params),
    {
      enabled: !!params?.query_params?.month && !!params?.query_params?.year,
    }
  );
};

export const useGetSingleTaskCategory = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_task_task_category_view, params],
    () => getSingleTaskCategory(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};

export const useTaskCategoryIndexAdminArchive = (params?: TParams) => {
  return useQuery([queryKeys.task_admin_category_index, params], () =>
    getTaskCategoryIndex(params)
  );
};

export const useTaskIndex = (params?: TParams) => {
  return useQuery([queryKeys.task_index, params], () => getTaskIndex(params), {
    keepPreviousData: true,
  });
};
export const useGetTasks = (
  params: TParams,
  key: string,
  initialData?: any
) => {
  return useInfiniteQuery([key, params], (e) => getTaskGetTasks(params, e), {
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.next_page ? undefined : lastPage?.next_page;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.next_page
        ? firstPage.next_page - 2
        : +firstPage.tasks.length - 2 ?? undefined;
    },
    initialData,
  });
};

export const useResponsibleByFilter = (params?: TParams) => {
  return useQuery(
    [queryKeys.task_responsible_by_filter, params],
    () => getResponsibleByBranchAndCategory(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.category_id,
    }
  );
};

export const useCheckCanAssignResponsible = (params?: TParams) => {
  return useQuery(
    [queryKeys.task_can_assign_responsible, params],
    () => getCheckCanAssignResponsible(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.category_id,
    }
  );
};

export const useCheckCanAssignMySelf = (params?: TParams) => {
  return useQuery(
    [queryKeys.task_can_assign_myself, params],
    () => getCheckCanAssignMySelf(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.category_id,
    }
  );
};

export const useCreateTaskCategory = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => createTaskCategory(params),
    onSuccess,
    onError,
  });
};

export const useUpdateTaskCategory = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => updateTaskCategory(params),
    onSuccess,
    onError,
  });
};

export const useCreateTask = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => createTask(params),
    onSuccess,
    onError,
  });
};

export const useUpdateTask = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => updateTask(params),
    onSuccess,
    onError,
  });
};

export const useRestoreTaskCategory = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => restoreTaskCategory(params),
    onSuccess,
    onError,
  });
};

export const useRemoveTaskCategory = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => removeTaskCategory(params),
    onSuccess,
    onError,
  });
};

export const useChangeStatus = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => changeStatus(params),
    onSuccess,
    onError,
  });
};
