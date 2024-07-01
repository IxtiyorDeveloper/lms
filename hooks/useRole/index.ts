import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import role from "api/role";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { IRole } from "types/role";
import { queryKeys } from "constants/queryKeys";

/**
 * action
 * @param params
 */
export const saveRole = async (params?: TParams): Promise<any> => {
  try {
    const res = await role.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useSaveRole = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveRole(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
/**
 * action
 * @param params
 */
export const deleteRole = async (params?: TParams): Promise<any> => {
  try {
    const res = await role.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useDeleteRole = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteRole(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const getRolePageData = async (): Promise<IRole> => {
  try {
    const res = await role.pageData();
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err.response;
  }
};
export const useRolePageData = () => {
  return useQuery([queryKeys.role_page_data], () => getRolePageData());
};
export const getOneRole = async (params?: TParams): Promise<IRole> => {
  try {
    const res = await role.getOne(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const updateRole = async (params?: TParams): Promise<IRole> => {
  try {
    const res = await role.update(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

export const useGetOneRole = (params?: TParams) => {
  return useQuery([queryKeys.role_one, params], () => getOneRole(params), {
    ...(params?.type
      ? { enabled: params?.type === "update" }
      : { enabled: true }),
    keepPreviousData: true,
  });
};
export const useRolePageDataMemo = () => {
  const { data } = useRolePageData();
  return useMemo(() => {
    return data;
  }, [data]);
};
export const useRoleUpdate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateRole(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
