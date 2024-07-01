import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import rbac from "api/hr/rbac";

export const getRbacPermissions = async (params?: TParams) => {
  try {
    const res = await rbac.permissions(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const lmsRbacSave = async (params?: TParams) => {
  try {
    const res = await rbac.lmsSave(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const hrRbacSave = async (params?: TParams) => {
  try {
    const res = await rbac.hrSave(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const taskRbacSave = async (params?: TParams) => {
  try {
    const res = await rbac.taskSave(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const useRbacPermissions = (params?: TParams) => {
  return useQuery([queryKeys.admin_rbac_role_permissions], () =>
    getRbacPermissions(params)
  );
};

export const useLmsRbacSave = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return lmsRbacSave(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useHrRbacSave = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return hrRbacSave(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useTaskRbacSave = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return taskRbacSave(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
