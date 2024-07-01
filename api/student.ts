import axios from ".";
import { IData, TParams } from "types";
import { ISearchOneArs } from "../types/ars/student";
import { PROJECT_LMS } from "../constants";
import { addPotential } from "../hooks";

export default {
  getAllBannedStudentLists: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_list",
      query_params: {
        expand:
          "buttonActions,user.userProfile.avatar.children,user.userPhones,course,level.parent,preferDays,preferTimes,branch,user.userLabels.createdBy,groupType,permissionLabels,permissionActions,createdBy",
        ...params,
        page: +params?.page || 1,
        "per-page": +params?.pageSize || 20,
        type: 300,
      },
    });
  },
  sendSms: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_send_confirm_sms",
      body: {
        ...params,
        phone_number: params?.phone_number,
        first_name: params?.name,
      },
    });
  },
  resendSms: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_resend_confirm_sms",
      body: {
        ...params,
        phone_number: params?.phone_number,
        first_name: params?.name,
      },
    });
  },
  checkSms: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_confirm_sms",
      body: {
        ...params,
        phone_number: params?.phone_number,
        code: params?.code,
      },
    });
  },
  updateStudentFlow: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_flow_update",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  changeNoteStudent: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_change_note",
      query_params: {
        id: params?.id,
      },
      body: {
        note: params?.comment,
      },
    });
  },
  addAction: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_label_add",
      body: {
        type: params?.type,
        datetime: params?.datetime,
        color: params?.color,
        note: params?.note,
      },
      query_params: {
        user_id: params?.id,
        expand: "createdBy,user.userLabels",
      },
    });
  },
  addPotential: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_set_fallible",
      body: {
        type: params?.type,
        datetime: params?.datetime,
        color: params?.color,
        note: params?.note,
      },
      query_params: {
        user_id: params?.id,
        expand: "createdBy,user.userLabels",
      },
    });
  },
  removeAction: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_label_remove",
      body: {
        type: params?.type,
      },
      query_params: {
        user_id: params?.id,
      },
    });
  },
  removePotential: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_remove_fallible",
      body: {
        type: params?.type,
      },
      query_params: {
        user_id: params?.id,
      },
    });
  },
  waitingListDelete: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_delete",
      body: {
        ...params,
        id: undefined,
        note: params?.note,
      },
      query_params: {
        id: params?.id,
      },
    });
  },
  getOne: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_view",
      query_params: {
        id: params?.id,
        expand:
          params?.expand ??
          "startDateLabel,preferBranches,preferMentors,strictPreferences,groupType,group,source,preferDays,preferTimes,branch,level.parent,student.source,user.userPhones,course,currentGroupContact.group.level.parent,user.userProfile.avatar.children,stationaryHistory,dividedBalance",
      },
    });
  },
  getStartDateCalculation: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_start_date_calculation",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  getArchivedStudents: (params?: TParams) => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_archive_list",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
      },
      body: params?.body,
    });
  },
  backToWaiting: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_back_to_waiting_list",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  searchOneArs: (params?: TParams): IData<ISearchOneArs> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_student_search_one",
      query_params: {
        user_id: params?.user_id,
      },
    });
  },
  changePassword: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_change_password",
      query_params: {
        id: params?.id,
      },
      body: params,
    });
  },
  validateNumber: (
    params?: TParams,
    cancelToken?: any
  ): IData<{ message: string }> => {
    return axios.post(
      "/v1",
      {
        action: "admin_student_validate_phone",
        project: PROJECT_LMS,
        body: params,
      },
      {
        //@ts-ignore
        meta: {
          id: params?.index,
        },
        cancelToken,
      }
    );
  },
  banStudent: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_ban",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deleteStudentAvatar: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_delete_avatar",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
