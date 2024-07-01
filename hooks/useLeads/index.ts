import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TParams, TUpdateFunctions } from "types";
import leadList from "api/lead";
import { setLeads, store } from "store";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getLeadLists = async (params?: TParams) => {
  try {
    const res = await leadList.getAll(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err, showToast: !params?.toast_off });
    throw err;
  }
};
export const getOverallLeadStatistics = async (params?: TParams) => {
  try {
    const res = await leadList.getLeadStatistics(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getLeadHistory = async (params?: TParams) => {
  try {
    const res = await leadList.leadHistory(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const leadValidation = async (params?: TParams) => {
  try {
    return await leadList.validate(params);
  } catch (err: any) {
    throw err;
  }
};
export const getLeadTabs = async (params?: TParams) => {
  try {
    const res = await leadList.getLeadTabs(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const addLead = async (params?: TParams): Promise<any> => {
  try {
    const res = await leadList.addLead(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const updateLead = async (params?: TParams): Promise<any> => {
  try {
    const res = await leadList.updateLead(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const deleteLead = async (params?: TParams): Promise<any> => {
  try {
    const res = await leadList.deleteLead(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const markAction = async (params?: TParams) => {
  try {
    const res = await leadList.markAction(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const changeLeadColor = async (params?: TParams): Promise<any> => {
  try {
    const res = await leadList.changeLeadColor(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const changeLeadComment = async (params?: TParams): Promise<any> => {
  try {
    const res = await leadList.changeLeadNote(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const getCreatedByList = async () => {
  try {
    const res = await leadList.getAllCreatedByList();
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteLeadTab = async (params?: TParams): Promise<any> => {
  try {
    const res = await leadList.deleteLeadTab(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const getOneLead = async (params?: TParams) => {
  try {
    const res = await leadList.getOne(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const addLeadTab = async (params?: TParams): Promise<any> => {
  try {
    const res = await leadList.addLeadTab(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const updateLeadTab = async (params?: TParams): Promise<any> => {
  try {
    const res = await leadList.updateLeadTab(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const admin_lead_change_responsible = async (params?: TParams) => {
  try {
    const res = await leadList.admin_lead_change_responsible(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const leadCallHistory = async (params?: TParams) => {
  try {
    const res = await leadList.leadCallHistory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useLeadLists = (params?: TParams) => {
  return useQuery([queryKeys.lead_list, params], () => getLeadLists(params), {
    keepPreviousData: false,
    onSuccess: (data) => {
      store.dispatch(setLeads(data));
    },
    onError: params?.onError,
    enabled: params?.enabled,
  });
};
export const useOverallLeadStatistics = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_lead_statistics_by_admin, params],
    () => getOverallLeadStatistics(params),
    {
      keepPreviousData: false,
      onSuccess: (data) => {
        store.dispatch(setLeads(data));
      },
      onError: params?.onError,
      enabled: params?.enabled,
    },
  );
};
export const useLeadHistory = (params?: TParams) => {
  return useQuery(
    [queryKeys.lead_history, params],
    () => getLeadHistory(params),
    {
      enabled: params?.open && !!params?.id,
    },
  );
};
export const useLeadTabs = (params?: TParams) => {
  return useQuery([queryKeys.lead_tabs, params], () => getLeadTabs(params), {
    keepPreviousData: true,
  });
};
export const useCreatedByTabs = () => {
  return useQuery([queryKeys.lead_created_by], () => getCreatedByList());
};
export const useLead = (params?: TParams) => {
  return useQuery([queryKeys.lead, params], () => getOneLead(params), {
    enabled: !!params?.id,
  });
};
export const useLeadCallHistory = (params?: TParams) => {
  return useQuery(
    [queryKeys.lead_call_history, params],
    () => leadCallHistory(params),
    {
      enabled: params?.enabled && params?.open && !!params?.id,
    },
  );
};
export const useAddLead = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: addLead,
    onSuccess,
    onError,
  });
};
export const useUpdateLead = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: updateLead,
    onSuccess,
    onError,
  });
};
export const useAdminLeadChangeResponsible = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: admin_lead_change_responsible,
    onSuccess,
    onError,
  });
};
export const useAddLeadTab = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (params) =>
      params.type === "add" ? addLeadTab(params) : updateLeadTab(params),
    onSuccess,
    onError,
  });
};
export const useDeleteLeadTab = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: deleteLeadTab,
    onSuccess,
    onError,
  });
};
export const useDeleteLead = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: deleteLead,
    onSuccess,
    onError,
  });
};
export const useMarkActionLead = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: markAction,
    onSuccess,
    onError,
  });
};
export const useChangeColorLead = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: changeLeadColor,
    onSuccess,
    onError,
  });
};
export const useChangeCommentLead = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: changeLeadComment,
    onSuccess,
    onError,
  });
};
export const useLeadValidation = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: leadValidation,
    onSuccess,
    onError,
  });
};
