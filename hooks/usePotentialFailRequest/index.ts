import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import potentialFailRequest from "api/potentialFail/potentialFailRequest";

export const getPotentialFailRequests = async (params?: TParams) => {
  try {
    const res = await potentialFailRequest.getPotentialFailRequests(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getPotentialFailRequest = async (params?: TParams) => {
  try {
    const res = await potentialFailRequest.getPotentialFailRequest(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const getPFRequestReviewerGroups = async (params?: TParams) => {
  try {
    const res = await potentialFailRequest.getPFRequestReviewerGroups(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const createPotentialFailRequest = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await potentialFailRequest.createPotentialFailRequest(data);
  } catch (err: any) {
    throw err;
  }
};
export const updatePotentialFailRequest = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await potentialFailRequest.updatePotentialFailRequest(data);
  } catch (err: any) {
    throw err;
  }
};
export const deletePotentialFailRequest = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await potentialFailRequest.deletePotentialFailRequest(data);
  } catch (err: any) {
    throw err;
  }
};
export const usePotentialFailRequests = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_academic_potential_fail_requests, params],
    () => getPotentialFailRequests(params),
  );
};

export const usePotentialFailRequest = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_academic_potential_fail_request, params],
    () => getPotentialFailRequest(params),
  );
};
export const usePFRequestReviewerGroups = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_academic_potential_fail_request_reviewer_groups, params],
    () => getPFRequestReviewerGroups(params),
  );
};

export const useCreatePotentialFailRequest = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return createPotentialFailRequest(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const useUpdatePotentialFailRequest = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return updatePotentialFailRequest(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const useDeletePotentialFailRequest = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return deletePotentialFailRequest(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
