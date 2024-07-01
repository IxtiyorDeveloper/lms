import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TParams } from "types";
import teacher from "api/ars/teacher";
import { queryKeys } from "constants/queryKeys";

export const getGroupDays = async (params?: TParams) => {
  try {
    const res = await teacher.getGroupDays(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getGroupScores = async (params?: TParams) => {
  try {
    const res = await teacher.getScores(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getStudentScores = async (params?: TParams) => {
  try {
    const res = await teacher.getStudentScores(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getExamDates = async (params?: TParams) => {
  try {
    const res = await teacher.getExamDates(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const useGetGroupDays = (params?: TParams) => {
  return useQuery(
    [queryKeys.teacher_get_group_days, params],
    () => getGroupDays(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.group,
    }
  );
};

export const useGetGroupScores = (params?: TParams) => {
  return useQuery(
    [queryKeys.teacher_get_group_scores, params],
    () => getGroupScores(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.group,
    }
  );
};

export const useGetStudentScores = (params?: TParams) => {
  return useQuery(
    [queryKeys.group_student_progress, params],
    () => getStudentScores(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.group_id,
    }
  );
};

export const useGetExamDates = (params?: TParams) => {
  return useQuery(
    [queryKeys.get_exam_dates, params],
    () => getExamDates(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.group_id,
    }
  );
};
