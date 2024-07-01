import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TParams, TWaitingList } from "types";
import student from "api/student";
import { queryKeys } from "constants/queryKeys";

export const getBannedStudentLists = async (
  params?: TParams
): Promise<TWaitingList> => {
  try {
    const res = await student.getAllBannedStudentLists(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(
      Object.values(err.response?.data?.response?.errors as Object)[0][0]
    );
    throw err.response;
  }
};

export const useBannedStudentLists = (params?: TParams) => {
  return useQuery(
    [queryKeys.banned_student_list, params],
    () => getBannedStudentLists(params),
    {
      keepPreviousData: true,
    }
  );
};
