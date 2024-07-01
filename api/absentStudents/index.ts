import axios from "../";
import { IData, IFetchList, IPromiseData, TParams } from "types";
import {
  IAbsDate,
  IAbsentStudentByMentor,
  IAbsentStudents,
  IRedList,
  IRedListStatistics,
  IStudentRedListDay,
} from "types/absentStudents";
import { PROJECT_LMS } from "../../constants";

export default {
  getAbsentStudents: (
    params?: TParams
  ): IData<IPromiseData<IAbsentStudents[]>> => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_absent_student",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
      },
      body: params?.body,
    });
  },
  getRedList: (
    params?: TParams,
    cancelToken?: any
  ): IData<IFetchList<IRedList>> => {
    return axios.post(
      "/v1",
      {
        project: PROJECT_LMS,
        action: "admin_grouped_group_contact_red_list",
        // body: params?.body,
        body: {
          ...params?.body,
          page: params?.body?.page ?? 1,
          "per-page": params?.body?.pageSize ?? 20,
        },
        query_params: {
          expand: params?.body?.expand,
          page: params?.body?.page ?? 1,
          "per-page": params?.body?.pageSize ?? 20,
        },
      },
      { cancelToken }
    );
  },
  changeRedListCount: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_change_red_list_count",
      body: params,
    });
  },
  addLabelAll: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_label_add_all",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  addLabelAllFailed: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_label_add_all_failed",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  getUserUnits: (params?: TParams): IData<IStudentRedListDay[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_student_homeworks",
      query_params: {
        ...params?.query_params,
        opened: 1,
        passed: 0,
        is_populated: 0,
        without_current_unit: 1,
      },
    });
  },
  groupContactLsatAttendance: (params?: TParams): IData<IAbsDate[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_last_attendance",
      query_params: {
        contact_id: params?.contact_id,
      },
    });
  },
  getRedListStatistics: (params?: TParams): IData<IRedListStatistics[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_red_list_by_teacher",
      ...params,
    });
  },
  getStudentsByMentor: (
    params?: TParams
  ): IData<IFetchList<IAbsentStudentByMentor>> => {
    return axios.post("/v1", {
      project: "lms-v2",
      action: "admin_grouped_group_contact_absent_student_by_mentor",
      query_params: params?.query_params,
    });
  },
};
