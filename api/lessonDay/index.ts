import axios from "../";
import { IData, IPromiseData, TParams } from "types";
import { ILessonDay } from "types/lessonDay";
import { PROJECT_LMS } from "../../constants";
export default {
  getLessonDays: (params?: TParams): IData<IPromiseData<ILessonDay>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_lesson_day_index",
      query_params: params?.query_params,
    });
  },
  createLessonDay: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_lesson_day_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deleteLessonDay: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_lesson_day_delete",
      query_params: params?.query_params,
    });
  },
  getLessonDay: (params?: TParams): IData<ILessonDay> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_lesson_day_view",
      query_params: params?.query_params,
    });
  },
  updateLessonDay: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_lesson_day_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
