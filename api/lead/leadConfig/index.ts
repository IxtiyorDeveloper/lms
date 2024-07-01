import axios from "../../index";
import { ICompany, IData, IFetchList, ISmsHistory, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  save: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_create_sms_template",
      body: params,
    }),
  update: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_update_sms_template",
      body: params,
      query_params: {
        id: params?.id,
      },
    }),
  templateList: (params?: TParams): IData<IFetchList<ICompany[]>> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_sms_template_list",
      query_params: {
        ...params,
        page: params?.page || 1,
        "per-page": params?.pageSize || 20,
      },
    }),
  getOne: (params?: TParams): IData<ICompany> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_sms_template_view",
      query_params: {
        id: params?.id,
      },
    }),
  smsHistory: (params?: TParams): IData<IFetchList<ISmsHistory[]>> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_sms_delivery_list",
      query_params: {
        type: 200,
        expand: "createdBy.userProfile.avatar.children",
        ...params,
      },
    }),
  deleteSmsTemplate: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_delete_sms_template",
      query_params: {
        id: params?.id,
      },
    }),
};
