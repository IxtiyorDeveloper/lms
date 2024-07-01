import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  ISchedule,
  TParams,
  IGroup,
  IAdminGroupInitialPage,
  IGroupList,
  TUpdateFunctions,
  IGroupInfo,
} from "types";
import groups from "api/groups";
import { getRecommendation } from "../useWaitingList";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "../../utils";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getGroupPage = async (params?: TParams): Promise<ISchedule> => {
  try {
    const res = await groups.getGroupSchedulePage(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err.response;
  }
};
export const getGroupStatisticsStudentsCount = async (params?: TParams) => {
  try {
    const res = await groups.getGroupStatisticsStudentsCount(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err.response;
  }
};
export const getGroupPreviewDate = async (params?: TParams) => {
  try {
    const res = await groups.getGroupPreviewDate(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err.response;
  }
};
export const getScheduleData = async (params?: TParams): Promise<ISchedule> => {
  try {
    const res = await groups.getGroupScheduleData(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err.response;
  }
};
export const getGroupList = async (params?: TParams): Promise<IGroupList> => {
  try {
    const res = await groups.getGroupScheduleList(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getGroupLifeCycle = async (params?: TParams) => {
  try {
    const res = await groups.getGroupLifeCycle(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getGroupStudyTypes = async (params?: TParams) => {
  try {
    const res = await groups.getGroupStudyTypes(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getOneGroup = async (params?: TParams): Promise<IGroup> => {
  try {
    const res = await groups.getOneGroup(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const groupInfo = async (params?: TParams): Promise<IGroupInfo[]> => {
  try {
    const res = await groups.groupInfo(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const staffGroups = async (params?: TParams) => {
  try {
    const res = await groups.staffGroups(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const dailyOfficeHours = async (params?: TParams) => {
  try {
    const res = await groups.dailyOfficeHours(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const admin_group_mentor_replace_info = async (params?: TParams) => {
  try {
    const res = await groups.admin_group_mentor_replace_info(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const admin_group_update = async (params?: TParams) => {
  try {
    const res = await groups.admin_group_update(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getInitialGroupPage = async (
  params?: TParams,
): Promise<IAdminGroupInitialPage> => {
  try {
    await sleep(500);
    const res = await groups.getGroupInitialPage(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err.response;
  }
};
export const createGroup = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await groups.createGroup(data);
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const updateGroup = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await groups.updateGroup(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteStudentsNote = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await groups.deleteStudentsNote(data);
  } catch (err: any) {
    throw err;
  }
};
export const changeGroupState = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await groups.changeGroupState(data);
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const deleteGroup = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await groups.deleteGroup(data);
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const changeGroupNote = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await groups.changeGroupNote(data);
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

export const changeGroupResponsible = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await groups.changeGroupResponsible(data);
  } catch (err: any) {
    throw err;
  }
};

export const useGroupPage = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_schedule_page, params],
    () => getGroupPage(params),
    {
      keepPreviousData: false,
    },
  );
};
export const useGroupStatisticsStudentsCount = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_statistic_by_students_count, params],
    () => getGroupStatisticsStudentsCount(params),
    {
      keepPreviousData: false,
    },
  );
};
export const useAdminGroupMentorReplaceInfo = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_mentor_replace_info, params],
    () => admin_group_mentor_replace_info(params),
    params,
  );
};
export const useGroupLifeCycle = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_life_cycle, params],
    () => getGroupLifeCycle(params),
    params,
  );
};
export const useGetGroupPreviewDate = (params?: TParams) => {
  return useQuery(
    [queryKeys.system_group_preview_date, params],
    () => getGroupPreviewDate(params),
    {
      keepPreviousData: false,
      enabled:
        !!params?.body?.start_date &&
        !!params?.body?.level_id &&
        !!params?.body?.lesson_time_id &&
        !!params?.body?.group_type_id &&
        !!params?.body?.lesson_day_id &&
        !!params?.body?.study_type,
    },
  );
};
export const useScheduleData = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_schedule_data, params],
    () => getScheduleData(params),
    {
      keepPreviousData: false,
      enabled: !!params?.query_params?.branch_id,
    },
  );
};
export const useGroupList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_index, params],
    () => getGroupList(params),
    {
      keepPreviousData: true,
      enabled: !!params?.body?.enabled ?? !!params?.body?.branch_id,
    },
  );
};
export const useGroupListRecommendation = (params?: TParams) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      return getRecommendation({ ...params, page: pageParam });
    },
    queryKey: [queryKeys.admin_group_index, params],
    keepPreviousData: true,
    select: (data: any) => {
      return data.pages[0].list;
    },
    enabled: !!params?.sub_level_id,
  });
};
export const useGroup = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_view, params],
    () => getOneGroup(params),
    {
      enabled: !!params?.id,
      // keepPreviousData: true,
    },
  );
};
export const useGroupInfo = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_info, params],
    () => groupInfo(params),
    {
      enabled: !!params?.id,
    },
  );
};
export const useInitialGroupPage = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_initial_page, params],
    () => getInitialGroupPage(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useGetGroupStudyTypes = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_study_types, params],
    () => getGroupStudyTypes(params),
    {
      keepPreviousData: false,
      enabled:
        !!params?.query_params?.start_date &&
        !!params?.query_params?.lesson_day_id &&
        !!params?.query_params?.level &&
        params?.query_params?.group_form,
    },
  );
};
export const useStaffGroups = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_staff_groups, params],
    () => staffGroups(params),
    {
      keepPreviousData: false,
      enabled: !!params?.query_params?.user_id,
    },
  );
};
export const useDailyOfficeHours = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_support_daily_office_hours, params],
    () => dailyOfficeHours(params),
    {
      keepPreviousData: false,
      enabled: !!params?.query_params?.support_id,
    },
  );
};
export const useCreateGroup = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createGroup<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useChangeGroupState = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeGroupState<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useAdminGroupUpdate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return admin_group_update(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useUpdateGroup = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateGroup<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useDeleteStudentsNote = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteStudentsNote<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useChangeGroupResponsible = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeGroupResponsible<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useDeleteGroup = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteGroup<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useChangeGroupNote = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeGroupNote<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
