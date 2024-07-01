import { toast } from "react-toastify";
import { IPromiseData, TParams, TUpdateFunctions } from "types";
import attendance from "api/attendance";
import { IAttendance } from "types/attendance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";

export const getAllAttendance = async (
  params?: TParams
): IPromiseData<IAttendance> => {
  try {
    const res = await attendance.getAll(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err.response;
  }
};
export const createAttendance = async <T extends TParams>(
  data: T
): Promise<any> => {
  try {
    return attendance.attend(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateAttendance = async <T extends TParams>(
  data: T
): Promise<any> => {
  try {
    return attendance.update(data);
  } catch (err: any) {
    throw err;
  }
};

/**
 * hooks
 * @param params
 */
export const useAllAttendance = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_get_attendance, params],
    () => getAllAttendance(params),
    {
      enabled: !!params?.group_id,
      keepPreviousData: true,
    }
  );
};
export const useCreateAttendance = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createAttendance<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateAttendance = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateAttendance<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
