import { TMeta, TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import department from "api/department";
import { IDepartment } from "types/department";
import { queryKeys } from "constants/queryKeys";

/**
 * fetch data
 * @param params
 */
export const getAllDepartment = async (
  params?: TParams
): Promise<{ list: IDepartment[]; meta: TMeta }> => {
  try {
    const res = await department.getAll(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getOneDepartment = async (
  params?: TParams
): Promise<IDepartment> => {
  try {
    const res = await department.getOneDepartment(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const deleteDepartment = async (params?: TParams): Promise<any> => {
  try {
    const res = await department.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useDepartmentList = (params?: TParams) => {
  return useQuery([queryKeys.department_list, params], () =>
    getAllDepartment(params)
  );
};
export const useDepartment = (params?: TParams) => {
  return useQuery([queryKeys.admin_rbac_department_view, params], () =>
    getOneDepartment(params)
  );
};
/**
 * hooks
 * @param params
 */
export const saveDepartment = async (params?: TParams): Promise<any> => {
  try {
    const res = await department.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const editDepartment = async <T extends TParams>(
  params?: TParams
): Promise<T> => {
  try {
    const res = await department.edit(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useSaveDepartment = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveDepartment(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useEditDepartment = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return editDepartment(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteDepartment = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteDepartment(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
