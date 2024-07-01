import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import pageData from "api/pageData";
import { TParams, TUpdateFunctions } from "types";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getPaymentPageData = async () => {
  try {
    const res = await pageData.getPaymentSettingsPageData();
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err.response;
  }
};

export const usePaymentSettingsPageData = (enabled?: boolean) => {
  return useQuery(
    [queryKeys.get_payment_page_data],
    () => getPaymentPageData(),
    {
      enabled,
    }
  );
};

export const changePaymentSettings = async <T extends TParams>(data: T) => {
  try {
    await pageData.paymentSettingsSave(data);
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const changeBlackListStatus = async <T extends TParams>(data: T) => {
  try {
    await pageData.changeBlackListStatus(data);
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const paymentSecurity = async (data: TParams) => {
  try {
    const res = await pageData.paymentSecurity(data);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const paymentConfig = async (data: TParams) => {
  try {
    const res = await pageData.paymentConfig(data);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const paymentConfigData = async (data: TParams) => {
  try {
    const res = await pageData.paymentConfigData(data);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const usePaymentConfigData = (params: TParams) => {
  return useQuery(
    [
      queryKeys.admin_v1_finance_payment_config_online_payment_page_data,
      params,
    ],
    () => paymentConfigData(params)
  );
};
export const usePaymentSecurity = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return paymentSecurity(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const usePaymentConfig = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return paymentConfig(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useChangePaymentSettings = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changePaymentSettings<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useChangeBlackListStatus = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeBlackListStatus<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
