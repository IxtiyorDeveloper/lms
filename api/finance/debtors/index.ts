import { IData, TParams } from "types";
import { PROJECT_LMS } from "constants/projects";
import { IDebtorsStatistics } from "types/finance/debtors";
import axios from "../..";
export default {
  getDebtorStatistics: (params?: TParams): IData<IDebtorsStatistics> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_debt_statistic",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
};
