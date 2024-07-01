import registering from "api/staffSettings/registering";
import { validationErrorHandler } from "utils";
import { TParams, TUpdateFunctions } from "types";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import staff from "api/staffSettings/staff";
import rewards from "api/staffSettings/rewards";
import { MAIN_TOKEN_NAME } from "../../constants/tokenNames";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

export const getListOfRegistering = async (params?: TParams) => {
  try {
    const res = await registering.getListOfRegistering(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getInitData = async (params?: TParams) => {
  try {
    const res = await registering.getInitialData(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const sendRequest = async (params?: TParams) => {
  try {
    const res = await registering.sendRequest(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const createStaff = async (params?: TParams) => {
  try {
    const res = await registering.createStaff(params);
    return res.data.result;
  } catch (err: any) {
    // validationErrorHandler({ err });
    throw err;
  }
};

export const activateStaff = async (params?: TParams) => {
  try {
    const res = await registering.activateStaff(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const dismissStaff = async (params?: TParams) => {
  try {
    const res = await staff.dismissStaff(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const cancelDismissStaff = async (params?: TParams) => {
  try {
    const res = await staff.cancelDismassal(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const cancelRepositionStaff = async (params?: TParams) => {
  try {
    const res = await staff.cancelReposition(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const repositionStaff = async (params?: TParams) => {
  try {
    const res = await staff.repositionStaff(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const updateStaff = async (params?: TParams) => {
  try {
    const res = await staff.updateStaff(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const lifecycleStaff = async (params?: TParams) => {
  try {
    const res = await staff.lifecycleStaff(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const rewardsList = async (params?: TParams) => {
  try {
    const res = await rewards.list(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const giveReward = async (params?: TParams) => {
  try {
    const res = await rewards.give(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const cancelReward = async (params?: TParams) => {
  try {
    const res = await rewards.cancel(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const approveReward = async (params?: TParams) => {
  try {
    const res = await rewards.approve(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const restoreReward = async (params?: TParams) => {
  try {
    const res = await rewards.restore(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getStaff = async (params?: TParams) => {
  try {
    const res = await staff.getStaff(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

const validateNumber = async <T extends TParams>(params?: T) => {
  try {
    const res = await staff.validateNumber(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

const checkSms = async <T extends TParams>(params?: T) => {
  try {
    const res = await staff.checkSms(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

const sendSms = async (params?: TParams): Promise<any> => {
  try {
    const res = await staff.sendSms(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

const resendSms = async (params?: TParams): Promise<any> => {
  try {
    const res = await staff.resendSms(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

/* /----- hooks -----/ */
/* /----- hooks -----/ */
/* /----- hooks -----/ */

export const useRegisteringList = (params?: TParams) => {
  return useQuery(
    [queryKeys.registering_list_view, params],
    () => getListOfRegistering(params),
    {
      keepPreviousData: false,
    }
  );
};

export const useInitialData = (params?: TParams) => {
  const cookie = new Cookies();
  return useQuery(
    [queryKeys.staff_initial_data, params],
    () => getInitData(params),
    {
      staleTime: 1800000,
      enabled: !!cookie.get(MAIN_TOKEN_NAME),
      cacheTime: 99999999,
    }
  );
};
export const useGetLifecycleStaff = (params?: TParams) => {
  return useQuery(
    [queryKeys.get_staff_lifecycle, params],
    () => lifecycleStaff(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
export const useGetStaff = (params?: TParams) => {
  return useQuery(
    [queryKeys.get_staff_lifecycle, params],
    () => getStaff(params),
    {
      enabled: !!params?.query_params?.user_id,
    }
  );
};
export const useGetRewards = (params?: TParams) => {
  return useQuery([queryKeys.get_rewards, params], () => rewardsList(params));
};

export const useSendRequest = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => sendRequest(params),
    onSuccess,
    onError,
  });
};

export const useCreateStaff = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => createStaff(params),
    onSuccess,
    onError,
  });
};

export const useActivateStaff = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => activateStaff(params),
    onSuccess,
    onError,
  });
};

export const useDismissStaff = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => dismissStaff(params),
    onSuccess,
    onError,
  });
};
export const useCancelDismissStaff = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => cancelDismissStaff(params),
    onSuccess,
    onError,
  });
};
export const useCancelRepositionStaff = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => cancelRepositionStaff(params),
    onSuccess,
    onError,
  });
};

export const useReposition = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => repositionStaff(params),
    onSuccess,
    onError,
  });
};

export const useUpdateStaff = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => updateStaff(params),
    onSuccess,
    onError,
  });
};

export const useGiveReward = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => giveReward(params),
    onSuccess,
    onError,
  });
};
export const useCancelReward = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => cancelReward(params),
    onSuccess,
    onError,
  });
};
export const useApproveReward = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => approveReward(params),
    onSuccess,
    onError,
  });
};
export const useRestoreReward = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params?: TParams) => restoreReward(params),
    onSuccess,
    onError,
  });
};

export const useResendSmsStaff = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: resendSms,
    onSuccess,
    onError,
  });
};
export const useCheckSmsStaff = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: checkSms,
    onSuccess,
    onError,
  });
};

export const useValidatePhoneNumberStaff = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return validateNumber<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useSendSmsStaff = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: sendSms,
    onSuccess,
    onError,
  });
};
