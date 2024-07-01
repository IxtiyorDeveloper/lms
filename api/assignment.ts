import axios from ".";
import {
  IAssignment,
  IData,
  IFetchList,
  IPromiseData,
  ISupportTimeTable,
  TParams,
} from "types";
import { PROJECT_LMS } from "../constants";
import { IStaffViewPageInfoData } from "../types/staffSettings";

export default {
  getAll: (params?: TParams): IData<IFetchList<IAssignment>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_assignment_index",
      query_params: {
        role_id: params?.staffsGroupId || params?.id,
        expand:
          "lastStaffFlow,user.userProfile.avatar.children,user.passportBack.fileStorageItem,user.passportFront.fileStorageItem,user.userPhones,user.age,rbacRoleShift,staff,rbacAssignmentBranches.branch,actionPermissions",
        ...params,
        page: +params?.page || 1,
        "per-page": +params?.pageSize || 20,
      },
    });
  },
  save: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_department_create",
      body: {
        name: params?.name,
      },
    });
  },
  update: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_assignment_update",
      body: {
        name: params?.name,
      },
      query_params: {
        id: params?.id,
      },
    });
  },
  edit: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_assignment_update",
      query_params: {
        id: params?.id,
      },
      body: params,
    });
  },
  delete: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_assignment_delete",
      query_params: {
        id: params?.id,
      },
    });
  },
  //hired_date
  getOne: (params?: TParams): IData<IStaffViewPageInfoData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_get_model_data",
      query_params: {
        id: params?.id,
        expand:
          "staff, staffFlow, userPhones, staffFlowList.rbacRole, userProfile.avatar, rbacAssignment.rbacAssignmentBranches,  userFamilies, userEducations, userExperiences, userDocuments.fileStorageItem, tabPermissions, passportFront.fileStorageItem, passportBack.fileStorageItem, ieltsFile.fileStorageItem, jobApplicationFile.fileStorageItem, jobOrderFile.fileStorageItem, dismissalApplicationFile.fileStorageItem, dismissalOrderFile.fileStorageItem, laborContractFile.fileStorageItem, selfEmploymentFile.fileStorageItem, otherFile.fileStorageItem, workingHours, is_support",
      },
    });
  },
  //hired_date
  getStaffTimeTable: (params?: TParams): IData<ISupportTimeTable> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_staff_support_time_table",
      query_params: {
        ...params,
        expand:
          "group.teacher.user.fullName,group.room.branch,group.lessonTime,group.lessonDay,activeOfficeHourCandidates.groupContact.user.userProfile.avatar,activeOfficeHourCandidates.groupContact.user.userPhones,activeOfficeHourCandidates.groupContact.group",
        fields:
          "id,time,date,comment,group,activeOfficeHourCandidates.topic,activeOfficeHourCandidates.status,activeOfficeHourCandidates.groupContact.user.userProfile.user_id,activeOfficeHourCandidates.groupContact.user.fullName,activeOfficeHourCandidates.id,activeOfficeHourCandidates.groupContact.user.userProfile.avatar,activeOfficeHourCandidates.groupContact.id,activeOfficeHourCandidates.groupContact.user.userProfile.firstname,activeOfficeHourCandidates.groupContact.user.userProfile.lastname",
      },
    });
  },
};
