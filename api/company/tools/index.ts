import axios from "../../index";
import { ICompanyFile, IData, TParams } from "types";
import { PROJECT_ARS, PROJECT_LMS } from "../../../constants";

export default {
  changeDate: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_change_level_recommendation_date",
      body: {
        day: params?.day,
      },
    }),
  getWaitingListConfig: (
    params?: TParams,
  ): IData<{
    level_striction_valid_days: number;
    day_striction_valid_days: number;
    time_striction_valid_days: number;
    teacher_striction_valid_days: number;
    branch_striction_valid_days: number;
    potentialGroupStudentCounts: { [key: string]: string };
  }> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "get_waiting_list_config",
      body: params?.body,
      query_params: params?.query_params,
    }),
  setWaitingListConfig: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "change_waiting_list_config",
      body: params?.body,
      query_params: params?.query_params,
    }),
  setMockConfig: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_ARS,
      action: "admin_level_config_set_mock_config",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getMockConfig: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_ARS,
      action: "admin_level_config_get_mock_config",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getReferralConfigPageData: () => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_referral_form_page_data",
    });
  },
  setRestudyConfig: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_tools_restudy_config",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  changeReferralCoins: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_referral_set_configuration",
      body: params,
    }),
  changeWillPayDate: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_tools_save_will_pay_config",
      body: params?.body,
      query_params: params?.query_params,
    }),
  changeGroupStartDate: (params?: TParams): IData<ICompanyFile> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_change_groups_date",
      body: params,
    }),
  deleteGroupNotes: (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_delete_groups_note",
    }),
  routParams: (params?: TParams): IData<{ [key: string]: string }> =>
    axios.post("/v1", {
      project: params?.project || PROJECT_LMS,
      action: params?.action || "admin_tools_route_params",
      ...params,
    }),
};
