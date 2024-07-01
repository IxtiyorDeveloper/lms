import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import sources from "api/company/source";
import { queryKeys } from "constants/queryKeys";

export const getSources = async (params?: TParams) => {
  try {
    const res = await sources.getSources(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getSource = async (params?: TParams) => {
  try {
    const res = await sources.getSource(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createSource = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    let res = await sources.createSource(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteSource = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await sources.deleteSource(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateSource = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await sources.updateSource(data);
  } catch (err: any) {
    throw err;
  }
};
export const useSources = (params?: TParams) => {
  return useQuery([queryKeys.admin_company_get_source_list, params], () =>
    getSources(params)
  );
};
export const useSource = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_company_get_source_view, params],
    () => getSource(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
export const useCreateSource = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createSource<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useDeleteSource = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteSource<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useUpdateSource = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateSource<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
