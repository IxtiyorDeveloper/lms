import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import groupType from "api/groupType";
import { queryKeys } from "constants/queryKeys";

export const getGroupTypes = async (params?: TParams) => {
  try {
    const res = await groupType.getGroupTypes(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getGroupType = async (params?: TParams) => {
  try {
    const res = await groupType.getGroupType(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createGroupType = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await groupType.createGroupType(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteGroupType = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await groupType.deleteGroupType(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateGroupType = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await groupType.updateGroupType(data);
  } catch (err: any) {
    throw err;
  }
};
export const useGroupTypes = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_course_group_type_index, params],
    () => getGroupTypes(params),
    {
      enabled: !!params?.query_params?.course_id,
    }
  );
};
export const useGroupType = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_course_group_type_view, params],
    () => getGroupType(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
export const useCreateGroupType = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createGroupType<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useDeleteGroupType = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteGroupType<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useUpdateGroupType = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateGroupType<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
