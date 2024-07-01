import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import cron from "api/sms/cron";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getCronSms = async (params?: TParams) => {
  try {
    const res = await cron.pageData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const admin_get_sms_service = async () => {
  try {
    const res = await cron.admin_get_sms_service();
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const admin_set_sms_service = async (data?: TParams) => {
  try {
    const res = await cron.admin_set_sms_service(data);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const saveCron = async <T extends TParams>(params?: T) => {
  try {
    const res = await cron.save(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
  }
};
export const switchCron = async <T extends TParams>(params?: T) => {
  try {
    const res = await cron.switch(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
  }
};

export const useCronSms = (params?: TParams) => {
  return useQuery([queryKeys.sms_cron, params], () => getCronSms(params));
};

export const useAdminGetSmsService = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_get_sms_service, params],
    admin_get_sms_service,
    { keepPreviousData: false },
  );
};
export const useSaveCronSms = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveCron<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useAdminSetSmsService = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return admin_set_sms_service(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useSwitchSms = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return switchCron<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
