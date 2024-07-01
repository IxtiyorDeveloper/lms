import axios from "../";
import { ICourse, IData, IPromiseData, TParams } from "types";
import { PROJECT_LMS } from "../../constants";
export default {
  getCourses: (params?: TParams): IData<IPromiseData<ICourse>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_index",
      query_params: params?.query_params,
    });
  },
  getCourse: (params?: TParams): IData<ICourse> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_view",
      query_params: params?.query_params,
    });
  },
  createCourse: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_create",
      body: params?.body,
    });
  },
  deleteCourse: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_delete",
      query_params: params?.query_params,
    });
  },
  updateCourse: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
