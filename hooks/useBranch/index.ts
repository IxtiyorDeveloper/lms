import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import branch from "api/company/branch";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getAllBranch = async (params?: TParams) => {
  try {
    const res = await branch.getAll(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getOneBranch = async (params?: TParams) => {
  try {
    const res = await branch.getOne(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const deleteBranch = async (params?: TParams) => {
  try {
    const res = await branch.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const saveBranch = async (params?: TParams) => {
  try {
    const res = await branch.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateBranch = async (params?: TParams) => {
  try {
    const res = await branch.update(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useAllBranches = (params?: TParams) => {
  return useQuery(
    [queryKeys.branches_list, params],
    () => getAllBranch(params),
    {
      keepPreviousData: true,
      enabled: !params?.isLoading,
      staleTime: 60000,
    }
  );
};
export const useOneBranch = (params?: TParams) => {
  return useQuery([queryKeys.branch_list, params], () => getOneBranch(params), {
    enabled: !!params?.query_params?.id,
  });
};
export const useDeleteBranch = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteBranch(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSaveBranch = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveBranch(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateBranch = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateBranch(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
