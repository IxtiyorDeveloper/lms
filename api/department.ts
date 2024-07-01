import axios from ".";
import { TParams } from "types";
import { PROJECT_LMS } from "../constants";

export default {
  getAll: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_department_index",
      query_params: params?.query_params,
    });
  },
  getOneDepartment: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_department_view",
      query_params: params?.query_params,
    });
  },
  save: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_department_create",
      body: params,
    });
  },
  edit: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_department_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  delete: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_department_delete",
      query_params: {
        id: params?.id,
      },
    });
  },
};
