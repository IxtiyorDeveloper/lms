import axios from ".";
import { TParams } from "types";
import { PROJECT_LMS } from "../constants";

export default {
  getAll: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_transfer_get_groups",
      query_params: {
        contact_id: params?.contact_id,
        branch_id: params?.branch_id,
        expand:
          "groupMentors.user.userProfile,level.parent,room.branch,lessonDay,lessonTime,groupType,average_age,free_place",
        ...params,
      },
    });
  },
  save: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_transfer_perform",
      query_params: {
        group_id: params?.group_id,
        contact_id: params?.contact_id,
        expand: "group",
      },
      body: {
        date_to: params?.date_to,
        leaving_category_id: params?.leaving_category_id,
        transfer_date_from: params?.transfer_date_from,
        transfer_date_to: params?.transfer_date_to,
        reason: params?.reason,
      },
    });
  },
  pageData: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_transfer_page_data",
      query_params: {
        ...params,
      },
    });
  },
  calculation: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_transfer_calculation",
      query_params: {
        group_id: params?.group_id,
        contact_id: params?.contact_id,
        isOwnGroup: !!params?.isOwnGroup,
      },
      body: {
        transfer_date_from: params?.transfer_date_from,
        date_to: params?.date_to,
      },
    });
  },
  validate: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_transfer_validate",
      query_params: {
        group_id: params?.group_id,
        contact_id: params?.contact_id,
      },
      body: {
        date_to: params?.date_to,
        leaving_category_id: params?.leaving_category_id,
        transfer_date_from: params?.transfer_date_from,
        transfer_date_to: params?.transfer_date_to,
        reason: params?.reason,
      },
    });
  },
  back: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_transfer_back",
      query_params: {
        contact_id: params?.id,
      },
    });
  },
};
