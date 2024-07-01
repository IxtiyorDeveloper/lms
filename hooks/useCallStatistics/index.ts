import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import call from "api/statistics/call";

export const getCallList = async (params?: TParams) => {
  try {
    const res = await call.getCallList(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useCallList = (params?: TParams) => {
  return useQuery([queryKeys.admin_statistics_call_index, params], () =>
    getCallList(params),
  );
};
