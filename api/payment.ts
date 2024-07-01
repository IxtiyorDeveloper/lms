import axios from ".";
import { IData, TParams } from "types";
import { IDispersion } from "types/ICalculation";
import { PROJECT_LMS } from "../constants";

export default {
  getCalculation: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_payment_calculation",
      query_params: {
        contact_id: params?.id,
      },
    });
  },
  pay: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_payment_perform",
      query_params: {
        contact_id: params?.contact_id,
      },
      body: params?.body,
    });
  },
  admin_finance_stationary_give: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_stationary_give",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  studentBalance: (
    params?: TParams
  ): IData<{
    balance: number;
    debt: number;
  }> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_payment_student_balance",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  paymentRequest: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_grouped_payment_send_payment_request",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getDispersion: (params?: TParams): IData<IDispersion[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_get_dispersion_by_month",
      query_params: params?.query_params,
    });
  },
};
