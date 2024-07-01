import axios from ".";
import { TParams } from "../types";
import { PROJECT_LMS } from "../constants";

export default {
  getAll: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_get_attendance",
      query_params: {
        ...params,
      },
    });
  },
  attend: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_attendance",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  update: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_update_attendance",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
