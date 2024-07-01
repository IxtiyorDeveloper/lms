import { TParams, TUpdateFunctions } from "types";
import leavingCategories from "api/leavingCategory";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ILeavingCategoryList, ILeavingCategory } from "types/leavingCategory";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getLeavingCategories = async (
  params?: TParams
): Promise<ILeavingCategoryList> => {
  try {
    const res = await leavingCategories.getAll(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createLeavingCategory = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await leavingCategories.create(data);
  } catch (err: any) {
    throw err;
  }
};
export const getOneLeavingCategory = async (
  params?: TParams
): Promise<ILeavingCategory> => {
  try {
    const res = await leavingCategories.getOne(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const updateLeavingCategory = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await leavingCategories.update(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteLeavingCategory = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await leavingCategories.deleteMethod(data);
  } catch (err: any) {
    throw err;
  }
};
export const reorderLeavingCategory = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await leavingCategories.reorder(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 *
 * hooks
 * @param params
 */

export const useLeavingCategories = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_company_leaving_category_index, params],
    () => getLeavingCategories(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useCreateLeavingCategory = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createLeavingCategory<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useOneLeavingCategory = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_company_leaving_category_view, params],
    () => getOneLeavingCategory(params),
    {
      keepPreviousData: true,
      enabled: !!params?.id,
    }
  );
};
export const useUpdateLeavingCategory = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateLeavingCategory<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useReorderLeavingCategory = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return reorderLeavingCategory<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteLeavingCategory = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteLeavingCategory<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
