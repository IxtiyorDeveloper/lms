import { TParams } from "types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import call from "api/call";
import axios, { CancelTokenSource } from "axios";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getAllCallUsers = async (params?: TParams) => {
  try {
    const res = await call.getUsers(params);
    return res.data.result;
  } catch (err) {
    // validationErrorHandler({ err });
    throw err;
  }
};

export const operatorHistory = async (params?: TParams, page?: number) => {
  try {
    const res = await call.operatorHistory(params, page);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useCallUserList = (params?: TParams) => {
  return useQuery(
    [queryKeys.call_user_list, params],
    () => getAllCallUsers(params),
    {
      enabled: params?.enabled,
    }
  );
};

export const getAllCallHistory = async (params?: TParams) => {
  try {
    const res = await call.callHistory(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useCallHistory = (params?: TParams) => {
  return useQuery(
    [queryKeys.call_user_history, params],
    () => getAllCallHistory(params),
    {
      enabled: params?.enabled,
    }
  );
};

export const useOperatorHistory = (params?: TParams) => {
  return useInfiniteQuery(
    [queryKeys.admin_call_operator_calls, params],
    async ({ pageParam = 1 }) => operatorHistory(params, pageParam),
    {
      getPreviousPageParam: (firstPage: any) =>
        parseInt(firstPage.meta?.currentPage) - 1 ?? undefined,
      getNextPageParam: (lastPage: any) => {
        return lastPage.meta?.pageCount - lastPage.meta?.currentPage > 0
          ? parseInt(lastPage.meta?.currentPage) + 1
          : undefined;
      },
      ...params,
    }
  );
};

export const getAllCallStaffs = async (
  params?: TParams,
  source?: CancelTokenSource,
  setToken?: (data: CancelTokenSource) => void
) => {
  try {
    const a = axios.CancelToken.source();
    source && source?.cancel("Operation canceled by the user.");
    setToken && setToken(a);
    const res = await call.getStaff(params, {
      cancelToken: a.token,
    });
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useAllCallStaffs = (
  params?: TParams,
  source?: CancelTokenSource,
  setToken?: (data: CancelTokenSource) => void
) => {
  return useQuery(
    [queryKeys.call_staff_list, params],
    () => getAllCallStaffs(params, source, setToken),
    {
      enabled: params?.enabled,
    }
  );
};
