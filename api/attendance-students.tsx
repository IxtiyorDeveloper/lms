import axios from ".";
import { IData, TParams } from "../types";
import { IAttendanceStudents } from "../types/attendanceStudents";
import { PROJECT_LMS } from "../constants";

export default {
  getAll: (params?: TParams): IData<IAttendanceStudents[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_attendance_filter",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
