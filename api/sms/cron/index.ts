import axios from "../../";
import { ICronSms, IData, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  pageData: async (params?: TParams): IData<ICronSms> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_cron_index",
      query_params: params?.query_params,
    }),
  save: async (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_cron_save",
      body: params,
    }),
  switch: async (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_cron_switch_status",
      query_params: {
        key: params?.key,
      },
    }),
  admin_get_sms_service: async (
    params?: TParams,
  ): IData<{
    "100": {
      playmobile: boolean;
      eskiz: boolean;
    };
    "200": {
      playmobile: boolean;
      eskiz: boolean;
    };
  }> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_get_sms_service",
      query_params: {
        key: params?.key,
      },
    }),
  admin_set_sms_service: async (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_set_sms_service",
      query_params: params?.query_params,
      body: params?.body,
    }),
};
