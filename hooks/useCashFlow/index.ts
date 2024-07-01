import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import cashflow from "api/finance/cashflow";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getCashFlow = async (params?: TParams) => {
  try {
    const res = await cashflow.getSalaryMain(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const admin_finance_cash_flow_differences = async (params?: TParams) => {
  try {
    const res = await cashflow.admin_finance_cash_flow_differences(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getCashFlowExpense = async (params?: TParams) => {
  try {
    const res = await cashflow.getExpense(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useAdminFinanceCashFlowDifferences = (params?: TParams) => {
  return useQuery([queryKeys.admin_finance_cash_flow_differences, params], () =>
    admin_finance_cash_flow_differences(params)
  );
};

export const useCashFlow = (params?: TParams) => {
  return useQuery([queryKeys.cash_flow, params], () => getCashFlow(params));
};

export const useCashFlowExpenseList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_cashflow_expense_index, params],
    () => getCashFlowExpense(params),
    {
      keepPreviousData: true,
      ...params,
    }
  );
};
