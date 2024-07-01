import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import leadConfig from "api/lead/leadConfig";
import { queryKeys } from "constants/queryKeys";

export const saveLeadConfig = async (params?: TParams) => {
  try {
    const res = await leadConfig.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteLeadConfig = async (params?: TParams) => {
  try {
    const res = await leadConfig.deleteSmsTemplate(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateLeadConfig = async (params?: TParams) => {
  try {
    const res = await leadConfig.update(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getLeadSmsHistory = async (params?: TParams) => {
  try {
    const res = await leadConfig.smsHistory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getTemplateList = async (params?: TParams) => {
  try {
    const res = await leadConfig.templateList(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getOneTemplateList = async (params?: TParams) => {
  try {
    const res = await leadConfig.getOne(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useLeadConfigSmsTemplateList = (params?: TParams) => {
  return useQuery(
    [queryKeys.lead_config_sms_template, params],
    () => getTemplateList(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useLeadSmsHistory = (params?: TParams) => {
  return useQuery(
    [queryKeys.lead_config_sms_history, params],
    () => getLeadSmsHistory(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useOneLeadConfigSmsTemplateList = (params?: TParams) => {
  return useQuery(
    [queryKeys.lead_config_sms_template_one, params],
    () => getOneTemplateList(params),
    {
      enabled: !!params?.id,
    }
  );
};
export const useSaveLeadConfig = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveLeadConfig(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateLeadConfig = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateLeadConfig(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteLeadConfig = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteLeadConfig(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
