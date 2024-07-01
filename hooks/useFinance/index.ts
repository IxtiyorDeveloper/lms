import {
  TParams,
  IProductList,
  IProductEnums,
  TUpdateFunctions,
  IProduct,
} from "types";
import finance from "api/finance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";

export const getProductsServicesEnums = async (
  params?: TParams
): Promise<IProductEnums> => {
  try {
    const res = await finance.getProductEnums(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getProductsServicesList = async (
  params?: TParams
): Promise<IProductList> => {
  try {
    const res = await finance.getProductsList(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createProductService = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await finance.createProduct(data);
  } catch (err: any) {
    throw err;
  }
};
export const getOneProduct = async (params?: TParams): Promise<IProduct> => {
  try {
    const res = await finance.getOneProduct(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const updateProduct = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await finance.updateProduct(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteProduct = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await finance.deleteProduct(data);
  } catch (err: any) {
    throw err;
  }
};
export const getProductAndServiceStatistics = async (params?: TParams) => {
  try {
    const res = await finance.getProductAndServiceStatistics(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const getIncome = async (params?: TParams) => {
  try {
    const res = await finance.getIncome(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const getOneIncome = async (params?: TParams) => {
  try {
    const res = await finance.getOneIncome(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const getExpense = async (params?: TParams) => {
  try {
    const res = await finance.getExpense(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const useExpenseList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_expense_index, params],
    () => getExpense(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useProductAndServiceStatistics = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_product_and_service_statistics, params],
    () => getProductAndServiceStatistics(params)
  );
};
export const createIncome = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await finance.createIncome(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateIncome = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await finance.updateIncome(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateExpense = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await finance.updateExpense(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteIncome = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await finance.deleteIncome(data);
  } catch (err: any) {
    throw err;
  }
};
export const createBatch = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await finance.createBatch(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const divideExpense = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await finance.divideExpense(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const changeExpenseColor = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await finance.changeColor(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getOneExpense = async (params?: TParams) => {
  try {
    const res = await finance.getOneExpense(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const deleteExpense = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await finance.deleteExpense(data);
  } catch (err: any) {
    throw err;
  }
};
export const getFinanceStatistics = async (params?: TParams) => {
  try {
    const res = await finance.financeStatistics(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const financeStatisticsOnlinePayment = async (params?: TParams) => {
  try {
    const res = await finance.financeStatisticsOnlinePayment(params);
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

export const useProductsServicesEnums = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_product_and_service_enums, params],
    () => getProductsServicesEnums(params),
    {
      keepPreviousData: true,
    }
  );
};

export const useProductsServicesList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_product_and_service_index, params],
    () => getProductsServicesList(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useCreateProductService = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createProductService<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useOneProduct = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_product_and_service_view, params],
    () => getOneProduct(params),
    {
      enabled: !!params?.id,
    }
  );
};
export const useUpdateProduct = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateProduct<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteProduct = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteProduct<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useIncomeList = (params?: TParams) => {
  return useQuery([queryKeys.admin_finance_income_index, params], () =>
    getIncome(params)
  );
};
export const useOneIncome = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_income_view, params],
    () => getOneIncome(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};

export const useCreateIncome = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createIncome<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteIncome = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteIncome<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateIncome = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateIncome<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useCreateBatch = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createBatch<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDivideExpense = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return divideExpense<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateExpense = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateExpense<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useChangeExpenseColor = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeExpenseColor<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useOneExpense = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_expense_view, params],
    () => getOneExpense(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
export const useDeleteExpense = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteExpense<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useFinanceStatistics = (params?: TParams) => {
  return useQuery([queryKeys.admin_finance_statistic, params], () =>
    getFinanceStatistics(params)
  );
};

export const useFinanceStatisticsOnlinePayment = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_statistic_online_payment, params],
    () => financeStatisticsOnlinePayment(params),
    {
      keepPreviousData: true,
    }
  );
};
