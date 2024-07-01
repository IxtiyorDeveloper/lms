import axios from "../../";
import { ICashFlow, IData, TParams } from "types";
import { ITransactionExpense } from "types/finance/transactionExpense";
import { PROJECT_LMS } from "../../../constants";

export default {
  getSalaryMain: async (params?: TParams): IData<ICashFlow[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_cash_flow",
      query_params: {
        ...params?.query_params,
        expand: "children.totalAmount,children.detailedAmount",
        year: params?.year,
        month: params?.month,
      },
    });
  },
  admin_finance_cash_flow_differences: async (
    params?: TParams
  ): IData<
    {
      year: string;
      month: string;
      value: string;
      difference: number;
    }[]
  > => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_cash_flow_differences",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getExpense: async (params?: TParams): IData<ITransactionExpense[]> => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_cash_flow_expense",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize,
      },
    });
  },
};
