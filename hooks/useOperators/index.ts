import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import operator from "api/operator";
import { queryKeys } from "constants/queryKeys";

export const getOperators = async (params?: TParams) => {
  try {
    const res = await operator.getOperators(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getOperator = async (params?: TParams) => {
  try {
    const res = await operator.getOperator(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createOperator = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await operator.createOperator(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteOperator = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await operator.deleteOperator(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateOperator = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await operator.updateOperator(data);
  } catch (err: any) {
    throw err;
  }
};

/**
 * hooks
 * @param params
 */
export const useOperators = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_call_operator_list, params],
    () => getOperators(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useOperator = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_call_operator_view, params],
    () => getOperator(params),
    {
      enabled: !!params?.query_params?.id,
      keepPreviousData: true,
    }
  );
};
export const useCreateOperator = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createOperator<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteOperator = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteOperator<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateOperator = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateOperator<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
