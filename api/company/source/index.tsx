import axios from "../..";
import { ICourse, IData, IPromiseData, TParams, TSource } from "types";
import { PROJECT_LMS } from "../../../constants";
export default {
  getSources: (params?: TParams): IData<IPromiseData<TSource>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_get_source_list",
      query_params: params?.query_params,
    });
  },
  getSource: (params?: TParams): IData<TSource> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_get_source_view",
      query_params: params?.query_params,
    });
  },
  createSource: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_source_create",
      body: params?.body,
    });
  },
  deleteSource: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_source_delete",
      query_params: params?.query_params,
    });
  },
  updateSource: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_source_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
