import { toast } from "react-toastify";
import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import attendanceStudents from "api/attendance-students";
import { queryKeys } from "constants/queryKeys";

export const getAllAttendanceStudents = async (params?: TParams) => {
  try {
    const res = await attendanceStudents.getAll(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err.response;
  }
};
/**
 * hooks
 * @param params
 */
export const useAllAttendanceStudents = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_group_get_attendance, params],
    () => getAllAttendanceStudents(params),
    {
      keepPreviousData: true,
    }
  );
};
