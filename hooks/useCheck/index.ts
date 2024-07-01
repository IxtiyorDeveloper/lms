import { useMutation, useQuery } from "@tanstack/react-query";
import { TParams } from "types";
import systemIncomePrintCheck from "../../api/systemIncomePrintCheck";
import { queryKeys } from "constants/queryKeys";
import { wsCommand } from "utils/wsCommand";
import { setCheckUser, store } from "store";
import { toast } from "react-toastify";
import env from "utils/env";

export const system_tax_device_index = async (params?: TParams) => {
  try {
    const json = await systemIncomePrintCheck.system_tax_device_index(params);
    return json.data;
  } catch (err) {
    toast.error("Something went wrong!");
    throw err;
  }
};

export const getReceipt = async (params?: TParams) => {
  try {
    const json = await systemIncomePrintCheck.system_tax_receipt_get(params);
    return json.data;
  } catch (err) {
    throw err;
  }
};

export const saveReceipt = async (params?: TParams) => {
  try {
    const responseAxios =
      await systemIncomePrintCheck.system_tax_receipt_save(params);
    return responseAxios.data;
  } catch (err) {
    throw err;
  }
};

export const useTaxPageData = (params?: TParams) => {
  return useQuery({
    queryKey: [queryKeys.system_tax_device_index, params],
    queryFn: () => system_tax_device_index(params),
  });
};

export const wsConnect = async (params?: TParams) => {
  try {
    const json = await wsCommand(params?.body);
    return json;
  } catch (err) {
    throw err;
  }
};

export const wsDisConnect = async (params?: TParams) => {
  try {
    store.dispatch(setCheckUser({ branch: null, port: 8888, ip: undefined }));
    return true;
  } catch (err) {
    toast.error("Something went wrong!");
    throw err;
  }
};

export const useWsConnect = (params?: TParams) => {
  return useQuery({
    queryKey: ["ws-connect", params],
    queryFn: () => wsConnect(params),
    ...params,
    refetchInterval: env.taxDeviceConnectInterval,
  });
};

export const useWsDisConnect = (params?: TParams) => {
  return useMutation({ mutationFn: () => wsDisConnect(params), ...params });
};
export const useTaxWs = (params?: TParams) => {
  return useMutation<any, Error, TParams>({
    mutationFn: wsConnect,
    ...params,
  });
};
