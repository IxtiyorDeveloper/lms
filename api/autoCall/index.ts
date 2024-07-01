import axios from "../index";
import { IData, TParams } from "types";
import { PROJECT_LMS } from "constants/projects";
import { IAdminCallCron, IAutoCallPageData } from "../../types/autoCall";

export default {
  callPageData: (params?: TParams): IData<IAutoCallPageData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_page_data",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  callMetrics: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_call_metrics",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  autoCall: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_call_call",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  callCron: (params?: TParams): IData<IAdminCallCron> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_cron_index",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  callSwitchStatus: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_cron_switch_status",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  callCronSave: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_cron_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
