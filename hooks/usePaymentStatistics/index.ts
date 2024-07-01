import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import paymentStatistics from "api/finance/paymentStatistics";
import { queryKeys } from "constants/queryKeys";

export const getPaymentStatistics = async (params?: TParams) => {
  try {
    const res = await paymentStatistics.getPaymentStatistics(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getPaymentStatisticsGroup = async (params?: TParams) => {
  try {
    const res = await paymentStatistics.getPaymentStatisticsGroup(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const usePaymentStatistics = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_payment_statistics_index, params],
    () => getPaymentStatistics(params)
  );
};

export const usePaymentStatisticsGroup = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_payment_statistics_group, params],
    () => getPaymentStatisticsGroup(params),
    {
      enabled: !!params?.query_params?.user_id,
    }
  );
};
