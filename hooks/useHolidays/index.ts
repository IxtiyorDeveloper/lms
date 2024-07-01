import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import holiday from "api/holiday";
import { queryKeys } from "constants/queryKeys";
export const getHolidays = async (params?: TParams) => {
  try {
    const res = await holiday.getHolidays(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getHolidayWithGroup = async (params?: TParams) => {
  try {
    const res = await holiday.getHolidayWithGroup(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getHoliday = async (params?: TParams) => {
  try {
    const res = await holiday.getHoliday(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createHoliday = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await holiday.createHoliday(data);
  } catch (err: any) {
    throw err;
  }
};
export const createBatchHoliday = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await holiday.createBatchHoliday(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteHoliday = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await holiday.deleteHoliday(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateHoliday = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await holiday.updateHoliday(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useHolidays = (params?: TParams) => {
  return useQuery([queryKeys.admin_company_get_holiday_list, params], () =>
    getHolidays(params)
  );
};
export const useHoliday = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_company_get_holiday_one, params],
    () => getHoliday(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
export const useHolidayWithGroup = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_company_holiday_view_with_group, params],
    () => getHolidayWithGroup(params),
    {
      enabled: !!params?.query_params?.group_id,
    }
  );
};
export const useCreateHoliday = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createHoliday<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useCreateBatchHoliday = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createBatchHoliday<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteHoliday = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteHoliday<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateHoliday = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateHoliday<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
