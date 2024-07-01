import { TParams, TUpdateFunctions } from "types";
import config from "api/finance/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";

export const getFinancePageData = async (params?: TParams) => {
  try {
    const res = await config.getConfigPageData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const saveFinanceConfig = async <T extends TParams>(params?: T) => {
  try {
    const res = await config.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useFinancePageData = (params?: TParams) => {
  return useQuery(
    [queryKeys.finance_config_page_data, params],
    () => getFinancePageData(params),
    {
      keepPreviousData: false,
      staleTime: 0,
      enabled: params?.open,
    }
  );
};
export const useSaveFinanceConfig = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveFinanceConfig<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
