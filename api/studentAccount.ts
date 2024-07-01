import axios from ".";
import { IData, IFetchList, TParams } from "types";
import {
  ArsStudentData,
  IStudentEvent,
  IStudentExam,
  IStudentOrder,
  IStudentProfileExam,
  IStudentProgress,
  IStudentSkill,
  IStudentTopic,
} from "../types/student";
import { PROJECT_LMS } from "../constants";

export default {
  getStudentPayment: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_payment",
      query_params: {
        ...params,
      },
    });
  },
  getStudentCallHistory: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_call_history",
      query_params: {
        ...params,
        expand: "createdBy.rbacAssignment.rbacRole",
      },
    });
  },
  getStudentSearchOne: (params?: TParams): IData<ArsStudentData> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_student_search_one",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getStudentWordsCount: (params?: TParams): IData<IStudentTopic[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_student_profile_topic_words_count",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getStudentProgress: (params?: TParams): IData<IStudentProgress[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_student_profile_progress",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getStudentSkill: (params?: TParams): IData<IStudentSkill[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_student_profile_skill",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getStudentExam: (params?: TParams): IData<IStudentProfileExam[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_student_profile_exam",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getStudentEvent: (params?: TParams): IData<IStudentEvent[]> => {
    return axios.post("/v1", {
      project: "event",
      action: "admin_event_index",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getStudentSms: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_sms",
      query_params: {
        ...params,
      },
    });
  },
  getStudentOrder: (params?: TParams): IData<IFetchList<IStudentOrder>> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_student_profile_shop",
      query_params: {
        ...params?.query_params,
        expand: "option,option.product,option.product.images,option.properties",
      },
    });
  },
  getStudentGroup: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_group",
      query_params: {
        ...params,
      },
    });
  },
  getStudentLifeCycle: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_life_cycle",
      query_params: {
        ...params,
        expand: "createdBy.rbacAssignment.rbacRole",
      },
    });
  },
  blockAccount: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_block",
      query_params: {
        ...params,
      },
    });
  },
  unblockAccount: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_un_block",
      query_params: {
        ...params,
      },
    });
  },
};
