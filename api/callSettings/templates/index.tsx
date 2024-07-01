import axios from "../..";
import { IData, IPromiseData, TParams } from "types";
import { PROJECT_LMS } from "constants/projects";
import {
  ICallTemplatePageData,
  ICallTemplates,
} from "types/callSettings/templates";

export default {
  getTemplates: (params?: TParams): IData<IPromiseData<ICallTemplates>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_get_call_template",
      query_params: {
        ...params?.query_params,
        page: params?.query_params?.page || 1,
        "per-page": params?.query_params?.pageSize || 20,
      },
    });
  },
  createTemplate: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_create_call_template",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getTemplate: (params?: TParams): IData<ICallTemplates> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_template_view",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deleteTemplate: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_delete_call_template",
      query_params: params?.query_params,
    });
  },
  updateTemplate: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_update_call_template",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  callTemplatePageData: (params?: TParams): IData<ICallTemplatePageData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_get_call_template_page_data",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
