import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import stock from "api/stock";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const stockPageData = async (params?: TParams) => {
  try {
    const res = await stock.pageData(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const unit_status_info = async (params?: TParams) => {
  try {
    const res = await stock.unit_status_info(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const admin_product_transaction_statistics = async (
  params?: TParams,
) => {
  try {
    const res = await stock.admin_product_transaction_statistics(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const stockProductActions = async (params?: TParams) => {
  try {
    const res = await stock.stockProductActions(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const admin_product_view = async (params?: TParams) => {
  try {
    const res = await stock.admin_product_view(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getProductCashBox = async (params?: TParams) => {
  try {
    const res = await stock.getProductCashBox(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getAdminProducts = async (params?: TParams) => {
  try {
    const res = await stock.getAdminProducts(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const stockProductSave = async (params?: TParams) => {
  try {
    const res = await stock.stockProductSave(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const admin_action_delete = async (params?: TParams) => {
  try {
    const res = await stock.admin_action_delete(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const stock_admin_finance_stationary_give = async (params?: TParams) => {
  try {
    const res = await stock.admin_finance_stationary_give(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const admin_finance_stationary_cancel = async (params?: TParams) => {
  try {
    const res = await stock.admin_finance_stationary_cancel(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const stockProductArrival = async (params?: TParams) => {
  try {
    const res = await stock.stockProductArrival(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const admin_category_delete = async (params?: TParams) => {
  try {
    const res = await stock.admin_category_delete(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const stockCategories = async (params?: TParams) => {
  try {
    const res = await stock.stockCategories(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const createStockCategory = async (params?: TParams) => {
  try {
    const res = await stock.createStockCategory(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const useStockPageData = (params?: TParams) => {
  return useQuery([queryKeys.admin_category_index, params], () =>
    stockPageData(params),
  );
};
export const useAdminProductTransactionStatistics = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_product_transaction_statistics, params],
    () => admin_product_transaction_statistics(params),
    params,
  );
};
export const useAdminFinanceStationaryGive = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: stock_admin_finance_stationary_give,
    onSuccess,
    onError,
  });
};
export const useAdminFinanceStationaryCancel = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: admin_finance_stationary_cancel,
    onSuccess,
    onError,
  });
};
export const useUnitStatusInfo = (params?: TParams) => {
  return useQuery(
    [queryKeys.unit_status_info, params],
    () => unit_status_info(params),
    { keepPreviousData: true, enabled: !!params?.query_params?.product_id },
  );
};
export const useStockProductActions = (params?: TParams) => {
  return useQuery([queryKeys.admin_product_actions, params], () =>
    stockProductActions(params),
  );
};
export const useStockCategories = (params?: TParams) => {
  return useQuery([queryKeys.admin_page_data, params], () =>
    stockCategories(params),
  );
};
export const useAdminProductView = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_product_view, params],
    () => admin_product_view(params),
    params,
  );
};
export const useProductCashBox = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_product_cashbox, params],
    () => getProductCashBox(params),
    {
      enabled: !!params?.query_params?.branch_id,
    },
  );
};
export const useAdminProducts = (params?: TParams) => {
  return useQuery([queryKeys.admin_product_index, params], () =>
    getAdminProducts(params),
  );
};
export const useCreateStockCategory = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: createStockCategory,
    onSuccess,
    onError,
  });
};
export const useAdminCategoryDelete = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: admin_category_delete,
    onSuccess,
    onError,
  });
};
export const useStockProductSave = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: stockProductSave,
    onSuccess,
    onError,
  });
};
export const useStockProductArrival = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: stockProductArrival,
    onSuccess,
    onError,
  });
};
export const useStockProductDelete = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: stockProductSave,
    onSuccess,
    onError,
  });
};
export const useAdminActionDelete = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: admin_action_delete,
    onSuccess,
    onError,
  });
};
