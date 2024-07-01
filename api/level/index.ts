import axios from "../";
import { IData, IPromiseData, TLevel, TParams } from "types";
import { TGroupType } from "../../types/groupType";
import { PROJECT_LMS } from "../../constants";

export default {
  getLevels: (params?: TParams): IData<IPromiseData<TLevel>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_level_index",
      query_params: params?.query_params,
    });
  },
  createLevel: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_level_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deleteLevel: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_level_delete",
      query_params: params?.query_params,
    });
  },
  getLevel: (params?: TParams): IData<TLevel> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_level_view",
      query_params: params?.query_params,
    });
  },
  updateLevel: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_level_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  reorderLevel: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_level_re_order",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
