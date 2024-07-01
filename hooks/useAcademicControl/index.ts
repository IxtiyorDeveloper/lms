import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import academicControl from "api/academicControl";
import _ from "lodash";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getAcademicControlRedList = async (params?: TParams) => {
  try {
    const res = await academicControl.getAcademicControlRedList(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const setAcademicCommentRankingSave = async (params?: TParams) => {
  try {
    const res = await academicControl.setAcademicCommentRankingSave(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const getAcademicControlAttendance = async (params?: TParams) => {
  try {
    const res = await academicControl.getAcademicControlAttendance(params);
    return {
      ...res.data.result,
      data: res.data.result.data
        .map((e) => {
          return {
            ...e,
            visible: true,
            average:
              e.groups.length > 0
                ? Math.floor(_.sumBy(e.groups, (e) => +e.count))
                : 0,
          };
        })
        .sort((a, b) => b.average - a.average),
    };
  } catch (err: any) {
    throw err;
  }
};

export const getAcademicControlProgress = async (params?: TParams) => {
  try {
    const res = await academicControl.getAcademicControlProgress(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getAcademicControlGroups = async (params?: TParams) => {
  try {
    const res = await academicControl.getAcademicControlGroups(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getAcademicControlRedItemGroup = async (params?: TParams) => {
  try {
    const res = await academicControl.getAcademicControlRedItemGroup(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const admin_academic_fallible_get_by_group = async (
  params?: TParams,
) => {
  try {
    const res = await academicControl.adminAcademicFallibleGetByGroup(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getTeacherRanking = async (params?: TParams) => {
  try {
    const res = await academicControl.getTeacherRanking(params);
    return {
      data: params?.sort
        ? _.sortBy(res.data.result?.data, (e) => -e.overall)
        : res.data.result?.data,
      avg: (res.data.result?.averages as any)?.[0] || res.data.result?.averages,
    };
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getOneTeacherRanking = async (params?: TParams) => {
  try {
    const res = await academicControl.getOneTeacherRanking(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const setOneTeacherRankingStatus = async (params?: TParams) => {
  try {
    const res = await academicControl.setOneTeacherRankingStatus(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const getOneTeacherRankingChart = async (params?: TParams) => {
  try {
    const res = await academicControl.getOneTeacherRankingChart(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useAcademicControlRedList = (params?: TParams) => {
  return useQuery(
    [queryKeys.academicControlListKey, params],
    () => getAcademicControlRedList(params),
    {
      keepPreviousData: true,
      enabled: params?.enabled,
    },
  );
};
export const useTeacherRanking = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_ranking_mentor_rank_index, params],
    () => getTeacherRanking(params),
    params,
  );
};
export const useOneTeacherRanking = (params?: TParams) => {
  return useQuery(
    [queryKeys.client_ranking_mentor_rank_view, params],
    () => getOneTeacherRanking(params),
    params,
  );
};

export const useOneTeacherRankingChart = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_ranking_mentor_rank_progress_by_year, params],
    () => getOneTeacherRankingChart(params),
  );
};
export const useAcademicControlRedItemGroup = (params?: TParams) => {
  const enabled = !!params?.enabled;
  params?.enabled && delete params?.enabled;
  return useQuery(
    [queryKeys.groups, params],
    () => getAcademicControlRedItemGroup(params),
    {
      keepPreviousData: true,
      enabled,
    },
  );
};
export const useAdminAcademicFallibleGetByGroup = (params?: TParams) => {
  const enabled = !!params?.enabled;
  params?.enabled && delete params?.enabled;
  return useQuery(
    [queryKeys.admin_academic_fallible_get_by_group, params],
    () => admin_academic_fallible_get_by_group(params),
    {
      keepPreviousData: true,
      enabled,
    },
  );
};
export const useAcademicControlAttendance = (params?: TParams) => {
  return useQuery(
    [queryKeys.controlAttendance, params],
    () => getAcademicControlAttendance(params),
    {
      keepPreviousData: true,
      enabled: params?.enabled,
    },
  );
};
export const useAcademicControlProgress = (params?: TParams) => {
  return useQuery(
    [queryKeys.controlProgress, params],
    () => getAcademicControlProgress(params),
    {
      keepPreviousData: true,
      enabled: params?.enabled,
    },
  );
};
export const useAcademicControlGroups = (params?: TParams) => {
  return useQuery(
    [queryKeys.system_stats_academic_progress_by_mentor, params],
    () => getAcademicControlGroups(params),
    {
      keepPreviousData: true,
      enabled: params?.enabled,
    },
  );
};

export const useAcademicCommentRankingSave = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: setAcademicCommentRankingSave,
    onSuccess,
    onError,
  });
};
export const useSetOneTeacherRankingStatus = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: setOneTeacherRankingStatus,
    onSuccess,
    onError,
  });
};
