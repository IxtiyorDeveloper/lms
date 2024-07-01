import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import observation from "api/observation";
import { validationErrorHandler } from "utils";

export const getObservationList = async (params?: TParams) => {
  try {
    const res = await observation.getObservationList(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getObservation = async (params?: TParams) => {
  try {
    const res = await observation.getObservation(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getObservationEnums = async (params?: TParams) => {
  try {
    const res = await observation.getObservationEnums(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getObservationStatistics = async (params?: TParams) => {
  try {
    const res = await observation.getObservationStatistics(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getObservationMentorList = async (params?: TParams) => {
  try {
    const res = await observation.getObservationMentorList(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const saveObservation = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    const res = await observation.saveObservation(data);
    return res?.data?.result;
  } catch (err) {
    throw err;
  }
};
export const changeObservationStatus = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await observation.changeObservationStatus(data);
  } catch (err) {
    throw err;
  }
};
export const deleteObservation = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await observation.deleteObservation(data);
  } catch (err) {
    throw err;
  }
};

/**
 * hooks
 * @param params
 */
export const useObservationList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_ranking_observation_index, params],
    () => getObservationList(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useObservation = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_ranking_observation_view, params],
    () => getObservation(params),
    {
      enabled: !!params?.query_params?.id,
      keepPreviousData: true,
    },
  );
};
export const useObservationEnums = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_ranking_observation_enums, params],
    () => getObservationEnums(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useObservationStatistics = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_ranking_observation_statistics, params],
    () => getObservationStatistics(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useObservationMentorList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_ranking_observation_mentor_list, params],
    () => getObservationMentorList(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.type,
    },
  );
};
export const useSaveObservation = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveObservation<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useDeleteObservation = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteObservation<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useChangeObservationStatus = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeObservationStatus<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
