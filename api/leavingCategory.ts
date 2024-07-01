import { TParams } from "../types";
import axios from "./index";
import { PROJECT_LMS } from "../constants";

export default {
  getAll: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_leaving_category_index",
      query_params: {
        ...params,
      },
    });
  },
  getOne: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_leaving_category_view",
      query_params: {
        ...params,
      },
    });
  },
  create: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_leaving_category_create",
      body: params?.body,
    });
  },
  update: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_leaving_category_update",
      body: params?.body,
      query_params: {
        id: params?.id,
      },
    });
  },
  reorder: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_leaving_category_reorder",
      body: params?.body,
    });
  },
  deleteMethod: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_leaving_category_delete",
      query_params: {
        ...params,
      },
    });
  },
};
