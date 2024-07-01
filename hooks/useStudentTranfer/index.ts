import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TParams, TUpdateFunctions } from "types";
import studentTransfer from "api/studentTransfer";
import { queryKeys } from "constants/queryKeys";

export const saveTransfer = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentTransfer.save(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const backTransfer = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentTransfer.back(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const getTransferPageData = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentTransfer.pageData(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const useTransferPageData = (params?: TParams) => {
  return useQuery(
    [queryKeys.transfer_page_data, params],
    () => getTransferPageData(params),
    {
      keepPreviousData: true,
      enabled: !!params?.group_id && !!params?.contact_id,
    }
  );
};
export const getTransferCalc = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentTransfer.calculation(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getTransferValidate = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentTransfer.validate(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const useTransferCalc = (params?: TParams) => {
  return useQuery(
    [queryKeys.transfer_calc, params],
    () => getTransferCalc(params),
    {
      enabled:
        !!params?.group_id &&
        !!params?.contact_id &&
        !!params?.transfer_date_from &&
        !!(params?.date_to || params?.isOwnGroup) &&
        !!(params?.isOwnGroup || params?.leaving_category_id) &&
        !!params?.reason &&
        !params?.isLoadingValidate &&
        params?.transfer,

      onError: params?.onError,
      onSuccess: params?.onSuccess,
    }
  );
};
export const useTransferValidate = (params?: TParams) => {
  return useQuery(
    [queryKeys.validate_transfer, params],
    () => getTransferValidate(params),
    {
      enabled:
        !!params?.group_id &&
        !!params?.contact_id &&
        !!params?.transfer_date_from &&
        !!params?.date_to &&
        !!params?.leaving_category_id &&
        !!params?.reason &&
        params?.transfer,
    }
  );
};
export const useSaveTransfer = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: saveTransfer,
    onSuccess,
    onError,
  });
};
export const useBackTransfer = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: backTransfer,
    onSuccess,
    onError,
  });
};
