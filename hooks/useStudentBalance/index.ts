import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import studentBalance from "api/finance/studentBalance";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "../../utils";

export const getAllStudentBalance = async (params?: TParams) => {
  try {
    const res = await studentBalance.getAll(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

export const returnMoney = async (params?: TParams) => {
  try {
    const res = await studentBalance.returnMoney(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const studentBalanceTransactionsList = async (params?: TParams) => {
  try {
    const res = await studentBalance.financeStudentBalanceTransactions(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const studentBalanceWithDrawConfirmation = async (params?: TParams) => {
  try {
    const res = await studentBalance.studentBalanceWithDrawConfirmation(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const studentBalanceWithDrawConfirmationCheck = async (
  params?: TParams,
) => {
  try {
    const res =
      await studentBalance.studentBalanceWithDrawConfirmationCheck(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getStudentBalanceDashboard = async (params?: TParams) => {
  try {
    const res = await studentBalance.dashboard(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

export const getStudentBalanceDashboardByCondition = async (
  params?: TParams,
) => {
  try {
    const res = await studentBalance.byCondition(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

export const getStudentBalanceDashboardByTransactions = async (
  params?: TParams,
) => {
  try {
    const res = await studentBalance.byTransaction(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

export const admin_finance_student_balance_balance_spent_confirmation = async (
  params?: TParams,
) => {
  try {
    const res =
      await studentBalance.admin_finance_student_balance_balance_spent_confirmation(
        params,
      );
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const admin_product_get_by_barcode = async (params?: TParams) => {
  try {
    const res = await studentBalance.admin_product_get_by_barcode(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const admin_finance_student_balance_confirm_balance_spent = async (
  params?: TParams,
) => {
  try {
    const res =
      await studentBalance.admin_finance_student_balance_confirm_balance_spent(
        params,
      );
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useAllStudentBalance = (params?: TParams) => {
  return useQuery(
    [queryKeys.student_balance, params],
    () => getAllStudentBalance(params),
    {
      keepPreviousData: true,
    },
  );
};

export const useStudentBalanceDashboard = (params?: TParams) => {
  return useQuery(
    [queryKeys.student_balance_dashboard, params],
    () => getStudentBalanceDashboard(params),
    {
      keepPreviousData: true,
    },
  );
};

export const useStudentBalanceDashboardByCondition = (params?: TParams) => {
  return useQuery(
    [queryKeys.student_balance_dashboard, params],
    () => getStudentBalanceDashboardByCondition(params),
    {
      keepPreviousData: true,
    },
  );
};

export const useStudentBalanceTransactionsList = (params?: TParams) => {
  return useQuery([queryKeys.student_balance_transactions, params], () =>
    studentBalanceTransactionsList(params),
  );
};

export const useStudentBalanceTransactions = (params?: TParams) => {
  return useQuery(
    [queryKeys.student_balance_dashboard_transactions_stats, params],
    () => getStudentBalanceDashboardByTransactions(params),
    {
      keepPreviousData: true,
    },
  );
};

export const useReturnMoney = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: returnMoney,
    onSuccess,
    onError,
  });
};
export const useStudentBalanceWithDrawConfirmation = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: studentBalanceWithDrawConfirmation,
    onSuccess,
    onError,
  });
};
export const useStudentBalanceWithDrawConfirmationCheck = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: studentBalanceWithDrawConfirmationCheck,
    onSuccess,
    onError,
  });
};
export const useAdminFinanceStudentBalanceBalanceSpentConfirmation = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: admin_finance_student_balance_balance_spent_confirmation,
    onSuccess,
    onError,
  });
};
export const useAdminFinanceStudentBalanceConfirmBalanceSpent = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: admin_finance_student_balance_confirm_balance_spent,
    onSuccess,
    onError,
  });
};
export const useAdminProductGetByBarcode = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: admin_product_get_by_barcode,
    onSuccess,
    onError,
  });
};
