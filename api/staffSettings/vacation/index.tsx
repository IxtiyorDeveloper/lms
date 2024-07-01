import axios from "../..";
import { IData, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";
import {
  IActiveVacationData,
  IActiveVacations,
  IActiveVacationsData,
  IDepartmentsListForVacation,
  IStaffVacationsList,
  IVacationStaff,
  UserVacationHistory,
  UserVacationHistoryObj,
} from "../../../types/staffSettings/vacation";

export default {
  createSlot: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_slot_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getUserVacationsList: (params?: TParams): IData<IStaffVacationsList> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_staff_vacations",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getSlotsByPeriod: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_slot_monthly",
      query_params: params?.query_params,
    });
  },
  createVacation: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_schedule_save",
      body: params?.body,
    });
  },
  getScheduleData: (params?: TParams): IData<IDepartmentsListForVacation[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_schedule_data",
      query_params: {
        ...params?.query_params,
        expand:
          "user.userProfile.avatar,rbacRole,staff.vacation_status,staff.working_periods",
        // "user.userPhones,user.userProfile.avatar,user.rbacAssignment.rbacRole,staff.vacation_status,staff.working_periods,vacation.createdBy,user.branches,groupCounts,groupCountsByTime,user.rooms",
      },
      body: params?.body,
    });
  },
  getAssignmentView: (
    params?: TParams,
  ): IData<IDepartmentsListForVacation[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_rbac_assignment_view",
      query_params: {
        ...params?.query_params,
        expand:
          "user.userProfile.avatar,user.userPhones,user.rooms,user.roomBranches,rbacRole,groupCounts,groupCountsByTime,user.userPhones",
      },
      body: params?.body,
    });
  },
  getUserDetail: (params?: TParams): IData<UserVacationHistoryObj> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_vacation_list",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getActiveVacations: (params?: TParams): IData<IActiveVacationsData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_active_list",
      query_params: {
        ...params?.query_params,
        expand:
          "user.userProfile.avatar,activeVacation,user.rbacAssignment.rbacAssignmentBranches.branch,vacation.createdBy",
      },
      body: params?.body,
    });
  },
  deleteVacation: (params?: TParams): IData<IVacationStaff> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_schedule_delete",
      query_params: params?.query_params,
    });
  },
  updateVacation: (params?: TParams): IData<IVacationStaff> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_vacation_schedule_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
