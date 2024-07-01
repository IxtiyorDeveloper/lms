import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import sms from "api/sms";
import { queryKeys } from "constants/queryKeys";

export const getSendSmsPageData = async (params?: TParams) => {
  try {
    const res = await sms.pageData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const sendLeadSmsTab = async (params?: TParams) => {
  try {
    const res = await sms.sendSmsToLead(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const sendSmsAll = async (params?: TParams) => {
  try {
    const res = await sms.sendSms(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const checkSmsCount = async (params?: TParams) => {
  try {
    const res = await sms.checkSmsCount(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const sendSmsLost = async (params?: TParams) => {
  try {
    const res = await sms.sendSmsToLost(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const sendStudentBalanceSms = async (params?: TParams) => {
  try {
    const res = await sms.sendSmsStudentBalance(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const sendCandidateSms = async (params?: TParams) => {
  try {
    const res = await sms.sendSmsToCandidate(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useSendSmsPageData = (params?: TParams) => {
  return useQuery(
    [queryKeys.sms_page_data, params],
    () => getSendSmsPageData(params),
    {
      keepPreviousData: true,
      enabled: !!params?.open,
    }
  );
};
export const useSendSmsAll = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return sendSmsAll(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useCheckSmsCount = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return checkSmsCount(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useSendSmsLost = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return sendSmsLost(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSendSmsStudentBalance = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return sendStudentBalanceSms(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSendSmsToLead = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return sendLeadSmsTab(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSendSmsToCandidate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return sendCandidateSms(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
