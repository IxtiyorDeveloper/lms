import axios from ".";
import { IData, IPageDataPayment, TParams } from "../types";
import { PROJECT_LMS } from "../constants";

export default {
  getCompanyInitialData: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_get_initial_data",
      query_params: {
        expand: params?.expand,
      },
    }),
  getPaymentSettingsPageData: (params?: TParams): IData<IPageDataPayment> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_payment_config_page_data",
      query_params: {
        expand: params?.expand,
      },
    }),
  paymentSettingsSave: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_payment_config_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  paymentSecurity: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_expense_security",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  paymentConfig: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_finance_payment_config_online_payment_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  paymentConfigData: (
    params?: TParams
  ): IData<{
    systems: { [key: string]: boolean };
  }> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_finance_payment_config_online_payment_page_data",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  changeBlackListStatus: (params?: TParams) => {
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_switch_black_list",
      ...params,
    });
  },
};
