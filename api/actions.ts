import axios from ".";
import { TParams } from "types";
import { PROJECT_LMS } from "../constants";

export default {
  stop: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_stop_calculation",
      query_params: params?.query_params,
      body: params?.body,
    }),
  stopStatusChange: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_change_next_status",
      query_params: params?.query_params,
      body: params?.body,
    }),
  pageData: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_stop_page_data",
      query_params: {
        contact_id: params?.id,
      },
    }),
  performStop: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_stop_perform",
      query_params: {
        contact_id: params?.id,
      },
      body: params?.body,
    }),
  unban: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_un_ban",
      query_params: params?.query_params,
    }),
  new_student_stop: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_stop_new_student",
      query_params: params?.query_params,
      body: params?.body,
    }),
};
