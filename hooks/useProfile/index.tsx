import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import profile from "api/profile";
import { queryKeys } from "constants/queryKeys";

export const getClientStaff = async (params?: TParams) => {
  try {
    const res = await profile.getClientStaff(params);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};
export const useClientStaff = (params?: TParams) => {
  return useQuery([queryKeys.admin_client_staff, params], () =>
    getClientStaff(params)
  );
};
