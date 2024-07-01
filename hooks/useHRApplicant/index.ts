import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import {
  ICandidate,
  ICheckCandidatePhoneNumber,
  TParams,
  TUpdateFunctions,
} from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { applicant } from "api/hr";

export const getConfigVacancy = async (params?: TParams) => {
  try {
    const res = await applicant.configVacancy(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getVacancyData = async (params?: TParams) => {
  try {
    const res = await applicant.vacancyPageData(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getPixelFormData = async () => {
  try {
    const res = await applicant.pixelFormData();
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStatusList = async (params?: TParams) => {
  try {
    const res = await applicant.getStatusList(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const mainGeneralIndex = async (params?: TParams) => {
  try {
    const res = await applicant.mainGeneralIndex(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const switchVacancy = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await applicant.switchVacancy(data);
  } catch (err: any) {
    throw err;
  }
};
export const vacancyFormSave = async <T extends TParams>(
  data: T
): Promise<any> => {
  try {
    const res = await applicant.vacancyFormSave(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const pixelFormSave = async <T extends TParams>(
  data: T
): Promise<any> => {
  try {
    const res = await applicant.pixelFormSave(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const checkPhoneNumber = async <T extends TParams>(
  data: T
): Promise<ICheckCandidatePhoneNumber> => {
  try {
    const res = await applicant.checkPhoneNumber(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const shareVacancy = async <T extends TParams>(
  data: T
): Promise<any> => {
  try {
    const res = await applicant.shareVacancy(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const takeCandidate = async <T extends TParams>(
  data: T
): Promise<ICandidate> => {
  try {
    const res = await applicant.takeCandidate(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteApplicant = async <T extends TParams>(
  data: T
): Promise<ICandidate> => {
  try {
    const res = await applicant.delete(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const mergeCandidate = async <T extends TParams>(data: T): Promise<ICandidate> => {
  try {
    const res = await applicant.merge(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useGetConfigVacancy = (enabled?: boolean) => {
  return useQuery([queryKeys.config_vacancy_index], () => getConfigVacancy(), {
    enabled,
  });
};
export const useGetVacancyData = (params?: TParams, enabled?: boolean) => {
  return useQuery(
    [queryKeys.vacancy_page_data, params],
    () => getVacancyData(params),
    {
      enabled: !!params && enabled,
    }
  );
};
export const useGetPixelData = (enabled?: boolean) => {
  return useQuery([queryKeys.pixel_page_data], () => getPixelFormData(), {
    enabled,
  });
};
export const useGetApplicantList = (params?: TParams, enabled?: boolean) => {
  return useQuery(
    [queryKeys.applicant_status_list, params],
    () => getStatusList(params),
    {
      enabled,
      keepPreviousData: true,
    }
  );
};
export const useGetApplicantMain = (params?: TParams, enabled?: boolean) => {
  return useQuery(
    [queryKeys.applicant_main_index, params, enabled],
    () => mainGeneralIndex(params),
    {
      enabled,
    }
  );
};

export const useSwitchVacancy = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: switchVacancy,
    onSuccess,
    onError,
  });
};
export const useVacancyFormSave = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: vacancyFormSave,
    onSuccess,
    onError,
  });
};
export const usePixelFormSave = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: pixelFormSave,
    onSuccess,
    onError,
  });
};
export const useCheckPhoneNumberApplicant = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: checkPhoneNumber,
    onSuccess,
    onError,
  });
};
export const useShareVacancy = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: shareVacancy,
    onSuccess,
    onError,
  });
};
export const useTakeCandidate = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: takeCandidate,
    onSuccess,
    onError,
  });
};
export const useDeleteApplicant = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: deleteApplicant,
    onSuccess,
    onError,
  });
};
export const useMergeCandidate = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: mergeCandidate,
    onSuccess,
    onError,
  });
};
