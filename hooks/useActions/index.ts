import { TParams, TUpdateFunctions } from "types";
import actions from "api/actions";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICalculation } from "types/ICalculation";
import { IStopPageData } from "types/stopPageData";
import { queryKeys } from "constants/queryKeys";

export const getStopCalculation = async (
  params?: TParams,
): Promise<ICalculation> => {
  try {
    const res = await actions.stop(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getStopPageData = async (
  params?: TParams,
): Promise<IStopPageData> => {
  try {
    const res = await actions.pageData(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const performStop = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await actions.performStop(data);
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const stopStatusChange = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await actions.stopStatusChange(data);
  } catch (err: any) {
    throw err;
  }
};
export const unban = async <T extends TParams>(data: T): Promise<void> => {
  try {
    await actions.unban(data);
  } catch (err: any) {
    throw err;
  }
};
export const new_student_stop = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await actions.new_student_stop(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 *
 * hooks
 * @param params
 */

export const useStopPageData = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_grouped_stop_page_data, params],
    () => getStopPageData(params),
    {
      keepPreviousData: true,
      enabled: !!params?.id,
    },
  );
};
export const useStopCalculation = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return getStopCalculation(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const usePerformStop = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return performStop<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useStopStatusChange = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return stopStatusChange<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useUnban = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return unban<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useNewStudentStop = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return new_student_stop<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
