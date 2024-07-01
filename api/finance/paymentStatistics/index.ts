import axios from "../..";
import { IData, TParams } from "types";
import {
  IPaymentStatistics,
  IPaymentStatisticsGroup,
} from "types/finance/paymentStatistics";
import { PROJECT_LMS } from "../../../constants";

export default {
  getPaymentStatistics: async (params?: TParams): IData<IPaymentStatistics> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_payment_statistics_index",
      query_params: params?.query_params,
    });
  },
  getPaymentStatisticsGroup: async (
    params?: TParams
  ): IData<IPaymentStatisticsGroup[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_payment_statistics_group",
      query_params: params?.query_params,
    });
  },
};
