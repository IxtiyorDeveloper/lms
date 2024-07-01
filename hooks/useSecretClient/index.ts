import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import secretClient from "api/secret-client";

export const admin_v1_secret_client_cycle_index_hammer = async (
  params?: TParams,
) => {
  try {
    const res = await secretClient.admin_v1_secret_client_cycle_index(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const admin_v1_secret_client_cycle_view = async (params?: TParams) => {
  try {
    const res = await secretClient.admin_v1_secret_client_cycle_view(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const admin_v1_secret_client_cycle_create = async (params?: TParams) => {
  try {
    const res =
      await secretClient.admin_v1_secret_client_cycle_create_update_delete(
        params,
      );
    return res.data.result;
  } catch (err) {
    !params?.isDisabledValidation && validationErrorHandler({ err });
    throw err;
  }
};
export const admin_v1_secret_client_cycle_delete = async (params?: TParams) => {
  try {
    const res = await secretClient.admin_v1_secret_client_cycle_delete(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const useAdminV1SecretClientCycleIndex = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_salary_cover_page_data, params],
    () => admin_v1_secret_client_cycle_index_hammer(params),
    params,
  );
};
export const useAdminV1SecretClientCycleView = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_v1_secret_client_cycle_view, params],
    () => admin_v1_secret_client_cycle_view(params),
    params,
  );
};

export const useAdminV1SecretClientCycleDelete = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return admin_v1_secret_client_cycle_delete(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const useAdminV1SecretClientCycleAction = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return admin_v1_secret_client_cycle_create(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
