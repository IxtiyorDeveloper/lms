import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import level from "api/level";
import { queryKeys } from "constants/queryKeys";

export const getLevels = async (params?: TParams) => {
  try {
    const res = await level.getLevels(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getLevel = async (params?: TParams) => {
  try {
    const res = await level.getLevel(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createLevel = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await level.createLevel(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteLevel = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await level.deleteLevel(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateLevel = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await level.updateLevel(data);
  } catch (err: any) {
    throw err;
  }
};
export const reorderLevel = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await level.reorderLevel(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useLevels = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_course_level_index, params],
    () => getLevels(params),
    {
      enabled: !!params?.query_params?.course_id,
    }
  );
};
export const useLevel = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_course_level_index, params],
    () => getLevel(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
export const useCreateLevel = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createLevel<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteLevel = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteLevel<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateLevel = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateLevel<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useReorderLevel = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return reorderLevel<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
