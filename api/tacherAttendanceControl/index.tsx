import axios from "../";
import { IData, IPromiseData, TParams } from "types";
import {
  IAttendanceControl,
  IAttendanceControlAbsList,
  IMissedAttendance,
} from "types/attendanceControl";
import { PROJECT_LMS } from "../../constants";

export default {
  getTeacherAttendanceControl: (
    params?: TParams
  ): IData<IAttendanceControl[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_attendance_control",
      query_params: params?.query_params,
    });
  },
  getTeacherAttendanceControlAbsList: (
    params?: TParams
  ): IData<IPromiseData<IAttendanceControlAbsList[]>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_abs_group_list",
      query_params: params?.query_params,
    });
  },
  getMissedAttendance: (params?: TParams): IData<IMissedAttendance[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_missed_attendance_group",
      query_params: params?.query_params,
    });
  },
};
