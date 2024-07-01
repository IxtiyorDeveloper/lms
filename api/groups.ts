import axios from ".";
import {
  IData,
  IGroup,
  IGroupStatistics,
  IGroupStudyTypes,
  IGroupUnits,
  ILeadHistory,
  TParams,
} from "types";
import { PROJECT_LMS } from "../constants";
import { ITeacherReplaceInfo } from "../types";
import { IObservationOfficeHour } from "../types/observation";

export default {
  getGroupSchedulePage: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_schedule_page",
      query_params: params?.query_params,
    });
  },
  getGroupPreviewDate: (params?: TParams): IData<IGroupUnits[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_group_preview_date",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getGroupScheduleList: (params?: TParams) => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_index",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
      },
      body: params?.body,
    });
  },
  getGroupScheduleData: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_schedule_data",
      query_params: params?.query_params,
    });
  },
  getGroupLifeCycle: (params?: TParams): IData<ILeadHistory[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_life_cycle",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getOneGroup: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_view",
      query_params: {
        expand: params?.expand,
        ...params,
        month: params?.month,
        year: params?.year,
      },
    });
  },
  deleteStudentsNote: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_clear_students_note",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  groupInfo: (params?: TParams) => {
    return axios.post("/v1", {
      project: "ars",
      action: "get_group_info",
      query_params: {
        ...params,
        expand: "currentUnit",
      },
    });
  },
  getGroupInitialPage: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_initial_page",
    });
  },
  createGroup: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_create",
      body: params,
    });
  },
  updateGroup: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_update",
      query_params: {
        id: params?.id,
      },
      body: params?.body,
    });
  },
  changeGroupState: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_change_state",
      query_params: {
        id: params?.id,
      },
      body: params?.body,
    });
  },
  deleteGroup: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_delete",
      query_params: {
        id: params?.id,
      },
    });
  },
  changeGroupNote: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_change_note",
      query_params: {
        id: params?.id,
      },
      body: {
        note: params?.comment,
      },
    });
  },
  getGroupStudyTypes: (params?: TParams): IData<IGroupStudyTypes[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_study_types",
      query_params: params?.query_params,
    });
  },
  staffGroups: (params?: TParams): IData<IGroup[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_staff_groups",
      query_params: params?.query_params,
    });
  },
  dailyOfficeHours: (params?: TParams): IData<IObservationOfficeHour[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_support_daily_office_hours",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  admin_group_mentor_replace_info: (
    params?: TParams,
  ): IData<ITeacherReplaceInfo> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_mentor_replace_info",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  admin_group_update: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  changeGroupResponsible: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_change_responsible",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getGroupStatisticsStudentsCount: (
    params?: TParams,
  ): IData<IGroupStatistics> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_statistic_by_students_count",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
