import axios from "..";
import { IData, TParams } from "types";
import { IStaffLifeCycle } from "types/staffSettings";
import { PROJECT_LMS } from "../../constants";

export default {
  dismissStaff: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_dismissal_staff",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  sendSms: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_sms_check_sms_send_sms_code",
      body: params?.body,
    });
  },
  resendSms: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_sms_check_sms_send_sms_code",
      body: params?.body,
    });
  },
  checkSms: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_sms_check_sms_check_sms_code",
      body: params?.body,
    });
  },
  repositionStaff: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_reposition_staff",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  updateStaff: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_update_staff",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  lifecycleStaff: (params?: TParams): IData<IStaffLifeCycle[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_get_life_cycle",
      query_params: {
        expand: "createdBy",
        ...params?.query_params,
      },
    });
  },
  getStaff: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_staff_get_staff",
      query_params: {
        expand:
          "next_day_students_count,userProfile.avatar,fullName,group_count,branchIds,redListStudentCount,blackListStudentCount,staff.group_count,support,abs_count,fallible_count,lost_count,new_student_attend_count,new_student_count,student_count,active_student_count,workingHours,teacher,support.userPhones,support.rbacAssignment.rbacRoleShift.days,support.workingHours,support.userProfile.avatar,teacher.userPhones,teacher.userProfile.avatar,userPhones,rbacAssignment.rbacRole.permissions",
        ...params?.query_params,
      },
    });
  },
  validateNumber: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      action: "admin_student_validate_phone",
      project: PROJECT_LMS,
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  cancelDismassal: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_cancel_dismissal",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  cancelReposition: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_cancel_reposition",
      query_params: {
        ...params?.query_params,
      },
    });
  },
};
