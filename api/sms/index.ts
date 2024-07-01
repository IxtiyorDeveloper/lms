import axios from "..";
import { IData, ISendSmsPageData, ISmsPhoneTypeCount, TParams } from "types";
import { parseModule } from "next/dist/build/analysis/parse-module";
import { PROJECT_LMS } from "../../constants";

export default {
  pageData: async (params?: TParams): IData<ISendSmsPageData> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_send_page_data",
      query_params: params?.query_params,
    }),
  sendSms: async (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_sms_sms_send",
      body: params?.body,
      query_params: params?.query_params,
    }),
  checkSmsCount: async (params?: TParams): IData<ISmsPhoneTypeCount> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_send_sms_metrics",
      body: params,
    }),
  sendSmsToLost: async (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_send_to_lost_students",
      body: params,
    }),
  sendSmsStudentBalance: async (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_send_to_student_balance",
      body: params,
    }),
  sendSmsToLead: async (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_send_sms",
      body: params,
    }),
  sendSmsToCandidate: async (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_send_sms",
      query_params: params?.query_params,
      body: params?.body,
    }),
};
