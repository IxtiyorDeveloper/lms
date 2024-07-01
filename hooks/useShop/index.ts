import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import shop from "api/finance/shop";

export const getShopNew = async (params?: TParams) => {
  try {
    const res = await shop.getShopNew(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const admin_shop_statistics = async (params?: TParams) => {
  try {
    const res = await shop.admin_shop_statistics(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const getShopGive = async (params?: TParams) => {
  try {
    const res = await shop.getShopGive(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const useOrderList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_order_index, params],
    () => getShopNew(params),
    {
      keepPreviousData: true,
    }
  );
};

export const useAdminShopStatistics = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_shop_statistics, params],
    () => admin_shop_statistics(params),
    params
  );
};

export const useShopGive = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return getShopGive(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
