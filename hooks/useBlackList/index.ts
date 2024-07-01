import { TParams } from "../../types";
import { useQuery } from "@tanstack/react-query";
import blackList from "api/finance/blackList";
import { queryKeys } from "constants/queryKeys";

export const getBlackList = async (params?: TParams) => {
  try {
    const res = await blackList.getBlackList(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useBlackList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_grouped_group_contact_black_list, params],
    () => getBlackList(params),
    {
      enabled:
        !!params?.query_params?.teacherIds && !!params?.query_params?.branch_id,
    }
  );
};
