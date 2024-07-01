import { TParams, TUpdateFunctions } from "types";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import notification from "api/notification";
import { createLevel } from "../useLevels";
import level from "../../api/level";
export const getNotifications = async (params?: TParams) => {
  try {
    const res = await notification.getNotifications(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getNotification = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await notification.getNotification(data);
  } catch (err: any) {
    throw err;
  }
};
export const readAll = async <T extends TParams>(data: T): Promise<void> => {
  try {
    await notification.readAll(data);
  } catch (err: any) {
    throw err;
  }
};
export const getAllNotifications = async (params: TParams, e: any) => {
  try {
    const res = await notification.getAllNotifications({
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
/**
 *
 * hooks
 * @param params
 */

export const useHotNotifications = (params?: TParams) => {
  return useQuery(
    [queryKeys.get_my_web_notifications, params],
    () => getNotifications(params),
    {
      keepPreviousData: false,
      enabled: !!params?.refetch,
      cacheTime: 0,
    }
  );
};
export const useGetAllNotifications = (
  params: TParams,
  key: string,
  initialData?: any
) => {
  return useInfiniteQuery(
    [key, params],
    (e) => getAllNotifications(params, e),
    {
      getNextPageParam: (lastPage, allPages) => {
        return !lastPage.next_page ? undefined : lastPage?.next_page;
      },
      initialData,
    }
  );
};
export const useGetNotification = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return getNotification<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useReadAll = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return readAll<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
