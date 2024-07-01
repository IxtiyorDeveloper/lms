import axios from "../..";
import { IData, TParams } from "types";
import {
  IArsTeacher,
  IExamDates,
  IProgress,
  IStudentScores,
} from "types/ars/teacher";

export default {
  getScores: (params?: TParams): IData<IStudentScores[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "get_group_student_scores",
      query_params: params?.query_params,
    });
  },
  getStudentScores: (params?: TParams): IData<IProgress[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "group_student_progress",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getGroupDays: (params?: TParams): IData<IArsTeacher[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "get_group_days",
      query_params: params?.query_params,
    });
  },
  getExamDates: (params?: TParams): IData<IExamDates[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "get_exam_dates",
      query_params: params?.query_params,
    });
  },
};
