import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import teacherAttendanceControl from "api/tacherAttendanceControl";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getTeacherAttendanceControl = async (params?: TParams) => {
  try {
    const res = await teacherAttendanceControl.getTeacherAttendanceControl(
      params
    );
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getTeacherAttendanceControlAbsList = async (params?: TParams) => {
  try {
    const res =
      await teacherAttendanceControl.getTeacherAttendanceControlAbsList(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getMissedAttendance = async (params?: TParams) => {
  try {
    const res = await teacherAttendanceControl.getMissedAttendance(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useTeacherAttendanceControl = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_grouped_group_contact_attendance_control, params],
    () => getTeacherAttendanceControl(params)
  );
};

export const useTeacherAttendanceControlAbsList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_abs_group_list, params],
    () => getTeacherAttendanceControlAbsList(params),
    {
      enabled: !!params?.query_params?.mentor_id,
    }
  );
};

export const useMissedAttendance = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_missed_attendance_group, params],
    () => getMissedAttendance(params),
    {
      enabled: !!params?.query_params?.mentor_id,
    }
  );
};
