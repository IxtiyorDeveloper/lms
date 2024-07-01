import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import settings from "../../api/company/settings";

export const getCurrentCompany = async (params?: TParams) => {
  try {
    const res = await settings.getCurrentCompany(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const updateCurrentCompany = async <T extends TParams>(data: T) => {
  try {
    await settings.updateCurrentCompany(data);
  } catch (err: any) {
    throw err;
  }
};
export const restrictAccess = async <T extends TParams>(data: T) => {
  try {
    await settings.restrictAccess(data);
  } catch (err: any) {
    throw err;
  }
};
export const useCurrentCompany = (params?: TParams) => {
  return useQuery([queryKeys.admin_company_current, params], () =>
    getCurrentCompany(params),
  );
};
export const useUpdateCurrentCompany = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateCurrentCompany<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const useRestrictAccess = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return restrictAccess<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
