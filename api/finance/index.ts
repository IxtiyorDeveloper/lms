import axios from "../index";
import { IData, IPromiseData, TParams } from "types";
import {
  IProductAndServiceStatistics,
  ITransactionIncome,
} from "types/finance/transactionIncome";
import { ITransactionExpense } from "types/finance/transactionExpense";
import { IStatistics } from "types/finance/statistics";
import { PROJECT_LMS } from "../../constants";

export default {
  getProductsList: (params?: TParams) => {
    const { page, pageSize, ...args }: any = params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_product_and_service_index",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize,
      },
    });
  },
  getOneProduct: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_product_and_service_view",
      query_params: {
        ...params,
      },
    });
  },
  getProductEnums: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_product_and_service_enums",
    });
  },
  createProduct: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_product_and_service_create",
      body: params?.body,
    });
  },
  updateProduct: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_product_and_service_update",
      query_params: {
        id: params?.id,
      },
      body: params?.body,
    });
  },
  deleteProduct: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_product_and_service_delete",
      query_params: params?.query_params,
    });
  },
  getIncome: async (
    params?: TParams
  ): IData<IPromiseData<ITransactionIncome>> => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_income_index",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
      },
    });
  },
  getProductAndServiceStatistics: async (
    params?: TParams
  ): IData<IProductAndServiceStatistics[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_product_and_service_statistics",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getOneIncome: async (params?: TParams): IData<ITransactionIncome> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_income_view",
      query_params: params?.query_params,
    }),
  createIncome: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_income_create",
      body: params?.body,
    });
  },
  getExpense: async (
    params?: TParams
  ): IData<IPromiseData<ITransactionExpense>> => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_index",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize,
      },
    });
  },
  deleteIncome: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_income_delete",
      query_params: {
        id: params?.id,
      },
    });
  },
  updateIncome: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_income_delete",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  createBatch: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_batch_create",
      body: params?.body,
    });
  },
  divideExpense: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_separate",
      body: params?.body,
    });
  },
  updateExpense: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getOneExpense: async (params?: TParams): IData<ITransactionExpense> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_view",
      query_params: params?.query_params,
    }),
  deleteExpense: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_delete",
      query_params: params?.query_params,
    });
  },
  financeStatistics: (params?: TParams): IData<IStatistics> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_statistic",
      query_params: params?.query_params,
    });
  },
  financeStatisticsOnlinePayment: (params?: TParams): IData<number> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_statistic_online_payment",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  changeColor: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_change_color",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
