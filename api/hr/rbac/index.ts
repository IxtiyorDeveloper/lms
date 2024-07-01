import axios from "../../";
import { IData, TParams, IHrRbacPermissions } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  permissions: (params?: TParams): IData<IHrRbacPermissions> => {
    return axios.post("/v1", {
      project: params?.project,
      version: params?.version,
      action: params?.action ?? "admin_rbac_role_permissions",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  lmsSave: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_role_permissions_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  hrSave: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_rbac_role_permissions_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  taskSave: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: params?.project ?? "task",
      version: params?.version == null ? undefined : params?.version || "v2",
      action: params?.action ?? "admin_rbac_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
