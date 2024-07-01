import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import template from "api/sms/template";
import { queryKeys } from "constants/queryKeys";

export const getAllSmsTemplate = async (params?: TParams) => {
  try {
    const res = await template.getAll(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateSmsTemplate = async (params?: TParams) => {
  try {
    const res = await template.update(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const saveSmsTemplate = async (params?: TParams) => {
  try {
    const res = await template.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteSmsTemplate = async (params?: TParams) => {
  try {
    const res = await template.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const viewSmsTemplate = async (params?: TParams) => {
  try {
    const res = await template.view(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useSmsTemplates = (params?: TParams) => {
  return useQuery(
    [queryKeys.sms_template, params],
    () => getAllSmsTemplate(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useGetOneSmsTemplates = (params?: TParams) => {
  return useQuery(
    [queryKeys.sms_template_one, params],
    () => viewSmsTemplate(params),
    {
      enabled: !!params?.id,
    }
  );
};
export const useUpdateSmsTemplate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateSmsTemplate(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSaveSmsTemplate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveSmsTemplate(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteSmsTemplate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteSmsTemplate(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
