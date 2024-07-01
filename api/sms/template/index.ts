import axios from "../../";
import { IData, IFetchList, ISmsTemplate, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";
export default {
  getAll: async (params?: TParams): IData<IFetchList<ISmsTemplate>> => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_template_index",
      query_params: {
        ...args,
        "per-page": params?.pageSize || 20,
        page: params?.page || 1,
      },
    });
  },
  update: async (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_template_update",
      query_params: {
        id: params?.id,
      },
      body: {
        name: params?.name,
        text: params?.text,
        model_type: 500,
      },
    }),
  view: async (params?: TParams): IData<ISmsTemplate> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_template_view",
      query_params: {
        id: params?.id,
      },
    }),
  save: async (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_template_create",
      body: {
        name: params?.name,
        text: params?.text,
        project: params?.project,
        model_type: params?.model_type,
      },
    }),
  delete: async (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_template_delete",
      query_params: {
        id: params?.id,
      },
    });
  },
};
