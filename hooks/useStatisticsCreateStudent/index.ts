import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import statisticsCreateStudent from "api/statistics/createStudent";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getStatisticsCreateStudent = async (params?: TParams) => {
  try {
    const res = await statisticsCreateStudent.getStatisticsCreateStudent(
      params
    );
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useStatisticsCreateStudent = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_statistics_created_student, params],
    () => getStatisticsCreateStudent(params),
    {
      keepPreviousData: true,
    }
  );
};
