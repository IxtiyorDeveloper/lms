import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import debtors from "api/finance/debtors";

/**
 * fetch data
 * @param params
 */
export const getDebtorStatistics = async (params?: TParams) => {
  try {
    const res = await debtors.getDebtorStatistics(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useDebtorStatistics = (params?: TParams) => {
  return useQuery([queryKeys.admin_finance_debt_statistic, params], () =>
    getDebtorStatistics(params)
  );
};
