import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import check from "api/finance/check";
import { queryKeys } from "constants/queryKeys";

export const getCheckData = async (params?: TParams) => {
  try {
    const res = await check.getCheckData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getProductCheckData = async (params?: TParams) => {
  try {
    const res = await check.getProductCheckData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useCheckData = (params?: TParams) => {
  return useQuery([queryKeys.check_data, params], () => getCheckData(params), {
    enabled: !!params?.income_id,
    keepPreviousData: true,
  });
};

export const useCheckDataC = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (params) => {
      return getCheckData(params);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useProductCheckData = (params?: TParams) => {
  return useQuery(
    [queryKeys.product_check_data, params],
    () => getProductCheckData(params),
    {
      enabled: !!params?.income_id,
      keepPreviousData: true,
    }
  );
};

export const useProductCheckDataC = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (params) => {
      return getProductCheckData(params);
    },
    {
      onSuccess,
      onError,
    }
  );
};
