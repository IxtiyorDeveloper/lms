import { CandidateStatus } from "constants/hr";
import axios from "../";
import {
  ICandidate,
  ICandidateMeeting,
  ICandidateResponsible,
  ICandidateStages,
  IData,
  IFetchList,
  IMeetingDay,
  InitialDataHR,
  TParams,
} from "types";
import { ICandidateLifecycle } from "types/lifeCycle";

export default {
  initialData: (params?: TParams): IData<InitialDataHR> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_initial_data",
      query_params: {
        expand:
          params?.query_params?.expand ??
          "userFirstMeeting,departmentListByVacancy,activeVacancyList,branchList,bonusForTypeList,vacancyList,candidatePhoneType,candidateStatus,candidateHistoryAction,candidateHistoryType,genderList,candidateStatusList,stageList,sourceList,candidateLabelList,userList,meetingUserList,rejectionTypeList, bannedTypeList, rejectedByList, vacancyApplicationStatusList",
      },
    });
  },
  getCandidate: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_model_data",
      query_params: {
        ...params?.query_params,
        expand:
          "candidatePhoneNumbers, own_phone_number, age, candidateAvatar.path, candidateAvatar.url, candidateDocuments.url,candidateDocuments.name, candidateLabels.responsible, candidateLabels.createdBy, candidateTrainingStages.name, abs, ceo_approved, candidateLabels, actionPermissions, labelPermissions, meeting, vacancy",
      },
    });
  },
  changeComment: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_change_comment",
      query_params: {
        id: params?.id,
      },
      body: {
        ...params,
        status: params?.comment,
      },
    });
  },
  changeColor: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_change_color",
      query_params: {
        id: params?.id,
        expand:
          "candidatePhoneNumbers, own_phone_number, age, candidateAvatar.url, candidateDocuments.url,candidateDocuments.name, candidateLabels.responsible, candidateLabels.createdBy, candidateTrainingStages.name, abs, ceo_approved, candidateLabels, actionPermissions, labelPermissions, meeting, vacancy",
      },
      body: {
        ...params,
        color: params?.color,
      },
    });
  },
  callRequestLabel: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_save_call_request_label",
      query_params: {
        id: params?.id,
        expand:
          "candidatePhoneNumbers, own_phone_number, age, candidateAvatar.url, candidateDocuments.url,candidateDocuments.name, candidateLabels.responsible, candidateLabels.createdBy, candidateTrainingStages.name, abs, ceo_approved, candidateLabels, actionPermissions, labelPermissions, meeting, vacancy",
      },
      body: {
        datetime: params?.datetime,
      },
    });
  },
  notAnswered: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_save_not_answered_label",
      query_params: {
        id: params?.id,
        expand:
          "candidatePhoneNumbers, own_phone_number, age, candidateAvatar.url, candidateDocuments.url,candidateDocuments.name, candidateLabels.responsible, candidateLabels.createdBy, candidateTrainingStages.name, abs, ceo_approved, candidateLabels, actionPermissions, labelPermissions, meeting, vacancy",
      },
      body: {
        ...params,
        datetime: params?.datetime,
      },
    });
  },
  lifeCycle: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_candidate_life_cycle",
      query_params: {
        id: params?.id,
        expand:
          "candidatePhoneNumbers, own_phone_number, age, candidateAvatar.url, candidateDocuments.url,candidateDocuments.name, candidateLabels.responsible, candidateLabels.createdBy, candidateTrainingStages.name, abs, ceo_approved, candidateLabels, actionPermissions, labelPermissions, meeting,vacancy",
      },
    });
  },
  rejected: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_rejected",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  create: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  update: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_edit",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  downloadMeeting: (params?: TParams): IData<IFetchList<ICandidate>> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_download_meeting",
      query_params: {
        count_type: "stage",
        status: CandidateStatus.CANDIDATE,
        expand:
          "candidatePhoneNumbers, own_phone_number, age, candidateAvatar.url, candidateDocuments.url, candidateLabels.responsible, candidateTrainingStages.name, abs, ceo_approved, meeting.responsible, vacancy",
        ...params?.query_params,
      },
    });
  },
  setMeeting: (params?: TParams): IData<ICandidateMeeting> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_set_meeting",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  absentMeeting: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_absent",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  clearMeeting: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_clear_meeting",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  approve: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_approve",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getMeetingDays: (params?: TParams): IData<IMeetingDay[]> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_day_meetings",
      query_params: {
        expand:
          "time, candidate.fullName, candidate.currentStage, candidate.currentVacancy",
        fields:
          "time, candidate.fullName, candidate.currentStage, candidate.currentVacancy",
      },
      body: params?.body,
    });
  },
  approveInfo: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_approve_info",
      query_params: {
        id: params?.id,
      },
    });
  },
  stageList: (params?: TParams): IData<ICandidateStages[]> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_stage_list",
      query_params: params?.query_params,
    });
  },
  lifecycle: (params?: TParams): IData<ICandidateLifecycle[]> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_candidate_life_cycle",
      query_params: {
        expand: "createdBy",
        ...params?.query_params,
      },
    });
  },
  setTraningStage: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_set_training_stage",
      query_params: {
        ...params?.query_params,
        expand: "trainingStages",
      },
      body: params?.body,
    });
  },
  meetingResponsible: (params?: TParams): IData<ICandidateResponsible[]> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_meeting_responsible",
      query_params: params?.query_params,
    });
  },
  candidateList: (params?: TParams): IData<IFetchList<ICandidate>> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_search",
      query_params: {
        expand: "candidatePhoneNumbers, candidateAvatar.url, vacancy",
        ...params?.query_params,
      },
    });
  },
};
