import axios from ".";
import { IData, TList, TParams, TWaitingList } from "types";
import { PROJECT_LMS } from "../constants";

export default {
  getAll: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_list",
      query_params: {
        expand:
          "groupType,buttonActions,user.userProfile.avatar.children,user.userPhones,preferTimes,preferDays,user.userLabels.createdBy,course,level.parent,branch,groupMentors,permissionLabels,permissionActions",
        ...params,
        page: +params?.page || 1,
        "per-page": +params?.pageSize || 20,
      },
    });
  },
  getAdminStudentList: (params?: TParams): IData<TWaitingList> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_list",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getDobList: (params?: TParams): IData<TList[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_dob",
      query_params: {
        expand:
          "buttonActions,group.groupType,actualTransfers.group,actualPayment,group.teacher.user.userProfile,group.support.user.userProfile,group.room,group.level.parent,group.groupMentors.user,contactResponsibles.user,user.userProfile.avatar.children,user.student.permissionLabels,group.lessonDay,group.lessonTime,user.userPhones,user.userLabels.createdBy,branch,permissionActions",
      },
    });
  },
  getHomeWorkNotDone: (params?: TParams): IData<TList[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_homework_not_done_by_date",
      ...params,
      query_params: {
        ...params?.query_params,
        expand:
          "buttonActions,group.groupType,actualTransfers.group,actualPayment,group.teacher.user.userProfile,group.support.user.userProfile,group.room,group.level.parent,group.groupMentors.user,contactResponsibles.user,user.userProfile.avatar.children,user.student.permissionLabels,group.lessonDay,group.lessonTime,user.userPhones,user.userLabels.createdBy,branch,permissionActions",
      },
    });
  },
  getAllRecommendation: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_recommendation",
      query_params: {
        expand:
          "buttonActions,user.userProfile.avatar.children,user.userPhones,preferTimes,preferDays,user.userLabels.createdBy,course,level.parent,branch,groupType,permissionLabels,permissionActions",
        ...params,
        page: +params?.page || 1,
        "per-page": +params?.pageSize || 20,
      },
    });
  },
  recommendation: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_recommendation",
      query_params: {
        user_id: params?.id,
        page: 1,
        ...params,
        "per-page": 500,
        expand:
          "groupMentors.user.userProfile,free_place,room.branch,lessonTime,lessonDay,level.parent,groupType,lessonDay.lessonWeeks,featureLevel.parent,contactsCountByGender,stopping_contact_count",
        lesson_time_id: undefined,
        sub_level_id: undefined,
        level_id: params?.sub_level_id,
      },
    });
  },
  addToGroup: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_group_recommendation",
      query_params: {
        user_id: params?.id,
        page: 1,
        ...params,
        "per-page": 500,
        expand:
          "groupMentors.user.userProfile,free_place,room.branch,lessonTime,lessonDay,level.parent",
        lesson_time_id: undefined,
        level_id: params?.sub_level_id,
      },
    });
  },
};
