import { IAssignment, TMeta, TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import assignment from "api/assignment";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";

/**
 * get All
 * @param params
 */
export const getAllAssignment = async (params?: TParams) => {
  try {
    const res = await assignment.getAll(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const deleteAssignment = async (params?: TParams): Promise<any> => {
  try {
    const res = await assignment.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useAssignmentList = (params?: TParams) => {
  return useQuery(
    [queryKeys.assignment_list, params],
    () => getAllAssignment(params),
    {
      keepPreviousData: true,
    }
  );
};
export const getOneAssignment = async (params?: TParams) => {
  try {
    const res = await assignment.getOne(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const getStaffTimeTable = async (params?: TParams) => {
  try {
    const res = await assignment.getStaffTimeTable(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const editAssignment = async (params?: TParams): Promise<any> => {
  try {
    const res = await assignment.edit(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useGetOneAssignment = (params?: TParams) => {
  return useQuery(
    [queryKeys.assignment_one, params],
    () => getOneAssignment(params),
    {
      keepPreviousData: false,
    }
  );
};
export const useGetStaffTimeTable = (params?: TParams) => {
  return useQuery(
    ["admin-staff-support-time-table", params],
    () => getStaffTimeTable(params),
    {
      keepPreviousData: false,
      enabled: !!params?.support_id && !!params?.enabled,
    }
  );
};
export const useDeleteAssignment = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteAssignment(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useEditAssignment = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return editAssignment(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
