import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import autoCall from "api/autoCall";

export const callPageData = async (params?: TParams) => {
  try {
    const res = await autoCall.callPageData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const callMetrics = async <T extends TParams>(data: T) => {
  try {
    const res = await autoCall.callMetrics(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const autoCallStudents = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await autoCall.autoCall(data);
  } catch (err: any) {
    throw err;
  }
};
export const callCron = async (params?: TParams) => {
  try {
    const res = await autoCall.callCron(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const callSwitchStatus = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await autoCall.callSwitchStatus(data);
  } catch (err: any) {
    throw err;
  }
};
export const callCronSave = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await autoCall.callCronSave(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useCallPageData = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_call_page_data, params],
    () => callPageData(params),
    {
      keepPreviousData: true,
      enabled: !!params?.open,
    },
  );
};
export const useCallMetrics = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return callMetrics<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useAutoCallStudents = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return autoCallStudents<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useCallCron = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_call_cron_index, params],
    () => callCron(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useCallSwitchStatus = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return callSwitchStatus<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useCallCronSave = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return callCronSave<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
