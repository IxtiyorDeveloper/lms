import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import examDates from "api/examDates";
import { queryKeys } from "constants/queryKeys";

export const getD = async (params: TParams) => {
  try {
    const res = await examDates.getData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useDates = (params: TParams) => {
  return useQuery([queryKeys.exam_dates, params], () => getD(params));
};
