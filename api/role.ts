import axios from ".";
import { TParams } from "types";
import { PROJECT_LMS } from "../constants";

export default {
  save: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_role_create",
      query_params: {
        id: params?.id,
      },
      body: params,
    });
  },
  pageData: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_role_page_data",
    });
  },
  getOne: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_role_view",
      query_params: {
        id: params?.staffsGroupId || params?.id,
        expand:
          "permissions,application_roles.role,application_roles.application_key,shifts.days, documents.fileStorageItem",
      },
    });
  },
  delete: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_role_delete",
      query_params: {
        id: params?.id,
      },
    });
  },
  update: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_role_update",
      query_params: {
        id: params?.id,
      },
      body: params,
    });
  },
};
