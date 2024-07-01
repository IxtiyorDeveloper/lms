import axios from ".";
import { IData, IMatchGroup, TParams, TSaveStudent, TWaitingList } from "types";
import { PROJECT_LMS } from "../constants";
import {expand} from "../app/student/active-students/expand";

export default {
  getNewStudents: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_index",
      query_params: {
        expand:
          "buttonActions,actualTransfers.group,actualPayment,group.groupType,group.teacher.user.userProfile,group.support.user.userProfile,group.room,group.level.parent,group.groupMentors.user,contactResponsibles.user,user.userProfile.avatar.children,user.student.permissionLabels,group.lessonDay,group.lessonTime,user.userPhones,user.userLabels.createdBy,branch,permissionActions",
        page: +params?.page || 1,
        "per-page": +params?.pageSize || 20,
        sort: params?.sort,
      },
      body: {
        ...params,
        tabs: 200,
      },
    });
  },
  getActiveStudents: (params?: TParams): IData<TWaitingList> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_index",
      query_params: {
        expand: expand,
        page: +params?.page || 1,
        "per-page": +params?.pageSize || 20,
      },
      body: {
        ...params,
        tabs: 100,
      },
    });
  },
  saveStudent: (body: TSaveStudent) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_create",
      body,
    });
  },
  admin_student_recommended_groups: (body?: TParams): IData<IMatchGroup> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_recommended_groups",
      query_params: body?.query_params,
      body: body?.body,
    });
  },
  updateStudent: <T extends TParams>(body: T) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_update",
      body,
      query_params: {
        id: body?.id,
      },
    });
  },
  notAttendedToAttended: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_attend",
      query_params: {
        contact_id: params?.id,
      },
    });
  },
  removeAttended: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_remove_attend",
      query_params: {
        contact_id: params?.id,
      },
    });
  },
  addToGroupContact: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_add_to_group",
      body: {
        date: params?.date,
        user_id: params?.user_id,
      },
      query_params: {
        group_id: params?.group_id,
      },
    });
  },
  groupContactPageData: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_page_data",
    });
  },
  changeGroupContactDateFrom: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_change_date_from",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
};
