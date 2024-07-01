import axios from "../";
import {
  IAcademicControlRedListGroup,
  IAcademicControlResponse,
  IArsProgress,
  IArsProgressGroup,
  IControlAttendanceResponse,
  IData,
  IPotentialFail,
  IRanking,
  IRankingChart,
  TParams,
} from "types";
import { PROJECT_LMS } from "../../constants";

export default {
  getAcademicControlRedList: (
    params?: TParams,
  ): IData<IAcademicControlResponse> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_home_work_not_done",
      ...params,
    });
  },
  getAcademicControlAttendance: (
    params?: TParams,
  ): IData<IControlAttendanceResponse> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_missed_attendance",
      ...params,
    });
  },
  getAcademicControlProgress: (params?: TParams): IData<IArsProgress> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_stats_academic_progress",
      ...params,
    });
  },
  getAcademicControlGroups: (params?: TParams): IData<IArsProgressGroup[]> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_stats_academic_progress_by_mentor",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  getAcademicControlRedItemGroup: (
    params?: TParams,
  ): IData<IAcademicControlRedListGroup[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_home_work_not_done_by_group",
      ...params,
    });
  },
  adminAcademicFallibleGetByGroup: (
    params?: TParams,
  ): IData<IAcademicControlRedListGroup[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_fallible_get_by_group",
      ...params,
    });
  },
  getTeacherRanking: (
    params?: TParams,
  ): IData<{
    data: IRanking[];
    averages: {
      progress_avg: string;
      lost_avg: string;
      offence_avg: string;
      overall_avg: string;
      exam_avg: string;
    };
  }> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_ranking_mentor_rank_index",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getOneTeacherRanking: (params?: TParams): IData<IRanking> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_ranking_mentor_rank_view",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  setOneTeacherRankingStatus: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_mentor_rank_switch_status",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getOneTeacherRankingChart: (params?: TParams): IData<IRankingChart[]> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_ranking_mentor_rank_progress_by_year",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  setAcademicCommentRankingSave: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_mentor_rank_academic_comment_change",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
