import axios from "../";
import {
  IData,
  TParams,
  IStockPage,
  IStockCategory,
  IStockProduct,
  IFetchList,
  IStockProductAction,
  IStockUnit,
  IStockProductStatistics,
} from "types";
import { PROJECT_LMS } from "../../constants";

export const stockPageDataExpand =
  "categories.products,locations,unitStatuses,tags,users";
export default {
  pageData: (params?: TParams): IData<IStockPage> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_page_data",
      query_params: {
        expand: stockPageDataExpand,
        ...params?.query_params,
      },
      body: params?.body,
    }),
  admin_product_transaction_statistics: (
    params?: TParams,
  ): IData<IStockProductStatistics[]> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_product_transaction_statistics",
      query_params: params?.query_params,
      body: params?.body,
    }),
  stockProductSave: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: "stock",
      action: params?.action ?? "admin_product_create",
      query_params: params?.query_params,
      body: params?.body,
    }),
  stockProductArrival: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: "stock",
      action: params?.action ?? "admin_action_arrival",
      query_params: params?.query_params,
      body: params?.body,
    }),
  stockCategories: (params?: TParams): IData<IStockCategory[]> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_category_index",
      query_params: params?.query_params,
      body: params?.body,
    }),
  stockProductActions: (
    params?: TParams,
  ): IData<IFetchList<IStockProductAction>> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_product_actions",
      query_params: params?.query_params,
      body: params?.body,
    }),
  createStockCategory: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: "stock",
      action: params?.action || "admin_category_create",
      query_params: params?.query_params,
      body: params?.body,
    }),
  admin_category_delete: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_category_delete",
      query_params: params?.query_params,
      body: params?.body,
    }),
  admin_product_view: (params?: TParams): IData<IStockProduct> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_product_view",
      query_params: params?.query_params,
      body: params?.body,
    }),
  unit_status_info: (params?: TParams): IData<IStockUnit> =>
    axios.post("/v1", {
      project: "stock",
      action: "unit_status_info",
      query_params: params?.query_params,
      body: params?.body,
    }),
  admin_action_delete: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_action_delete",
      query_params: params?.query_params,
      body: params?.body,
    }),
  admin_finance_stationary_give: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_stationary_give",
      query_params: params?.query_params,
      body: params?.body,
    }),
  admin_finance_stationary_cancel: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_stationary_cancel",
      query_params: params?.query_params,
      body: params?.body,
    }),
  getProductCashBox: (params?: TParams): IData<IStockProduct[]> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_product_cashbox",
      query_params: params?.query_params,
      body: params?.body,
    }),
  getAdminProducts: (params?: TParams): IData<IStockProduct[]> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_product_index",
      query_params: params?.query_params,
      body: params?.body,
    }),
};
