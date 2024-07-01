import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import region from "api/company/region";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

/**
 * get All
 * @param params
 */
export const getAllRegions = async (params?: TParams) => {
  try {
    const res = await region.getAll(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getOneRegion = async (params?: TParams) => {
  try {
    const res = await region.getOne(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const deleteRegion = async (params?: TParams) => {
  try {
    const res = await region.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const saveRegion = async (params?: TParams) => {
  try {
    const res = await region.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateRegion = async (params?: TParams) => {
  try {
    const res = await region.update(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useAllRegions = (params?: TParams) => {
  return useQuery(
    [queryKeys.regions_list, params],
    () => getAllRegions(params),
    {
      keepPreviousData: true,
      enabled: !params?.isLoading,
      staleTime: 60000,
    }
  );
};
export const useOneRegions = (params?: TParams) => {
  return useQuery([queryKeys.region_list, params], () => getOneRegion(params), {
    keepPreviousData: true,
    enabled: !!params?.id,
  });
};
export const useDeleteRegion = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteRegion(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSaveRegion = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveRegion(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateRegion = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateRegion(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
