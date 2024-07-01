import axios from "../";
import { IData, IPromiseData, TParams } from "types";
import { TGroupType } from "types/groupType";
import { PROJECT_LMS } from "../../constants";
export default {
  getGroupTypes: (params?: TParams): IData<IPromiseData<TGroupType>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_group_type_index",
      query_params: params?.query_params,
    });
  },
  createGroupType: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_group_type_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deleteGroupType: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_group_type_delete",
      query_params: params?.query_params,
    });
  },
  getGroupType: (params?: TParams): IData<TGroupType> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_group_type_view",
      query_params: params?.query_params,
    });
  },
  updateGroupType: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_group_type_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
