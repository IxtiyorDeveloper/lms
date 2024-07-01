import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import exclusion from "api/sms/exclusion";
import { queryKeys } from "constants/queryKeys";

export const getPageDataExclusion = async () => {
  try {
    const res = await exclusion.pageData();
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getAllExclusion = async () => {
  try {
    const res = await exclusion.getAll();
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const saveExclusion = async (params?: TParams) => {
  try {
    const res = await exclusion.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteExclusion = async (params?: TParams) => {
  try {
    const res = await exclusion.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const viewExclusion = async (params?: TParams) => {
  try {
    const res = await exclusion.view(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const viewCallExclusion = async (params?: TParams) => {
  try {
    const res = await exclusion.viewCallPageData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useExclusions = (params?: TParams) => {
  return useQuery([queryKeys.sms_exclusion, params], () => getAllExclusion(), {
    keepPreviousData: true,
  });
};
export const usePageDataExclusion = (params?: TParams) => {
  return useQuery([queryKeys.sms_exclusion_page_data, params], () =>
    getPageDataExclusion(),
  );
};
export const useGetOneExclusion = (params?: TParams) => {
  return useQuery(
    [queryKeys.sms_exclusion_one, params],
    () => viewExclusion(params),
    {
      enabled: !!params?.id || !!params?.user_id,
    },
  );
};

export const useGetOneCallExclusion = (params?: TParams) => {
  return useQuery(
    [queryKeys.call_exclusion_one, params],
    () => viewCallExclusion(params),
    {
      enabled: !!params?.id || !!params?.user_id,
    },
  );
};

export const useUpdateExclusion = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveExclusion(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useSaveExclusion = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveExclusion(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useDeleteExclusion = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteExclusion(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
