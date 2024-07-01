import { useQuery } from "@tanstack/react-query";
import waitingList from "api/waitingList";
import { TParams, TWaitingList } from "types";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getWaitingLists = async (
  params?: TParams,
): Promise<TWaitingList> => {
  try {
    const res = await waitingList.getAll(params);
    return res.data.result as TWaitingList;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getAdminStudentList = async (params?: TParams) => {
  try {
    const res = await waitingList.getAdminStudentList(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getDOBList = async (params?: TParams) => {
  try {
    const res = await waitingList.getDobList(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getRecommendationList = async (
  params?: TParams,
): Promise<TWaitingList> => {
  try {
    const res = await waitingList.getAllRecommendation(params);
    return res.data.result as TWaitingList;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useWaitingLists = (params?: TParams) => {
  return useQuery(
    [queryKeys.waiting_list, params],
    () => getWaitingLists(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useAdminStudentList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_list, params],
    () => getAdminStudentList(params),
    {
      keepPreviousData: true,
      enabled: params?.enabled,
    },
  );
};

export const useDOBList = (params?: TParams) => {
  return useQuery([queryKeys.dob_list, params], () => getDOBList(params), {
    keepPreviousData: true,
  });
};
export const useRecommendationList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_recommendation, params],
    () => getRecommendationList(params),
    {
      keepPreviousData: true,
    },
  );
};

export const getRecommendation = async (
  params?: TParams,
): Promise<TWaitingList> => {
  try {
    const res = await waitingList.recommendation(params);
    return res.data.result as TWaitingList;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useRecommendation = (params?: TParams) => {
  return useQuery(
    [queryKeys.recommendation, params],
    () => getRecommendation(params),
    {
      enabled: !!params?.level_id,
    },
  );
};
