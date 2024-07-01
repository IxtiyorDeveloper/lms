import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import podoRequest from "api/statistics/podoRequest";

export const getPodoRequestStatistics = async (params?: TParams) => {
  try {
    const res = await podoRequest.getPodoRequestStatistics(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getPodoRequestStatistic = async (params?: TParams) => {
  try {
    const res = await podoRequest.getPodoRequestStatistic(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const getRequestReviewerGroups = async (params?: TParams) => {
  try {
    const res = await podoRequest.getRequestReviewerGroups(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const createPodoRequest = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await podoRequest.createPodoRequest(data);
  } catch (err: any) {
    throw err;
  }
};
export const updatePodoRequest = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await podoRequest.updatePodoRequest(data);
  } catch (err: any) {
    throw err;
  }
};
export const deletePodoRequest = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await podoRequest.deletePodoRequest(data);
  } catch (err: any) {
    throw err;
  }
};
export const useGetPodoRequestStatistics = (params?: TParams) => {
  return useQuery([queryKeys.admin_academic_podo_requests, params], () =>
    getPodoRequestStatistics(params),
  );
};

export const useGetPodoRequestStatistic = (params?: TParams) => {
  return useQuery([queryKeys.admin_academic_podo_request, params], () =>
    getPodoRequestStatistic(params),
  );
};
export const useRequestReviewerGroups = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_academic_podo_request_reviewer_groups, params],
    () => getRequestReviewerGroups(params),
  );
};

export const useCreatePodoRequest = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return createPodoRequest(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const useUpdatePodoRequest = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return updatePodoRequest(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const useDeletePodoRequest = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return deletePodoRequest(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
