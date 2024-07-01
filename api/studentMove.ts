import axios from ".";
import { TParams } from "types";
import { PROJECT_LMS } from "../constants";

export default {
  validate: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_move_validate",
      query_params: {
        contact_id: params?.contact_id,
        group_id: params?.group_id,
      },
      body: {
        date_from: params?.date_from,
        reason: params?.reason,
        leaving_category_id: params?.leaving_category_id,
      },
    });
  },
  save: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_move_perform",
      query_params: {
        contact_id: params?.contact_id,
        group_id: params?.group_id,
        expand: "group",
      },
      body: {
        date_from: params?.date_from,
        reason: params?.reason,
        leaving_category_id: params?.leaving_category_id,
      },
    });
  },
  continuePerform: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_transfer_to_own_group",
      query_params: {
        contact_id: params?.contact_id,
      },
      body: {
        transfer_date_from: params?.transfer_date_from,
        reason: params?.reason,
        date_to: params?.date_to,
      },
    });
  },
  deleteStoppingStudent: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_archive",
      query_params: {
        contact_id: params?.contact_id,
      },
    });
  },
};
