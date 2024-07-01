import axios from "../../index";
import { IData, IPromiseData, TParams } from "types";
import { IExpenseCategory } from "types/finance/expenseCategory";
import { PROJECT_LMS } from "../../../constants";

export default {
  getExpenseCategoryList: async (
    params?: TParams
  ): IData<IPromiseData<IExpenseCategory>> => {
    const { page, pageSize, ...args }: any = params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_category_index",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
      },
    });
  },
  reorder: async (params?: TParams): IData<IPromiseData<boolean>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_category_reorder",
      body: {
        ids: params?.ids,
      },
    });
  },
  save: async (params?: TParams): IData<IPromiseData<boolean>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_category_create",
      body: params,
    });
  },
  update: async (params?: TParams): IData<IPromiseData<boolean>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_category_update",
      query_params: {
        id: params?.id,
      },
      body: params,
    });
  },
  delete: async (params?: TParams): IData<IPromiseData<boolean>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_category_delete",
      query_params: params,
    });
  },
};
