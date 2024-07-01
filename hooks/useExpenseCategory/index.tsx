import { TParams, TUpdateFunctions } from "types";
import finance from "api/finance/expenseCategory";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";

export const getExpenseCategoryList = async (params?: TParams) => {
  try {
    const res = await finance.getExpenseCategoryList(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const reorderCategoryList = async (params?: TParams) => {
  try {
    const res = await finance.reorder(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const saveCategoryList = async (params?: TParams) => {
  try {
    const res = await finance.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateCategoryList = async (params?: TParams) => {
  try {
    const res = await finance.update(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteCategoryList = async (params?: TParams) => {
  try {
    const res = await finance.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

/**
 *
 * hooks
 * @param params
 */

export const useExpenseCategoryList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_expense_category_index, params],
    () => getExpenseCategoryList(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useReorderExpenseCategories = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return reorderCategoryList(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSaveExpenseCategories = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveCategoryList(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateExpenseCategories = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateCategoryList(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteExpenseCategories = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteCategoryList(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
