import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import templates from "api/callSettings/templates";

export const getTemplates = async (params?: TParams) => {
  try {
    const res = await templates.getTemplates(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getTemplate = async (params?: TParams) => {
  try {
    const res = await templates.getTemplate(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const callTemplatePageData = async (params?: TParams) => {
  try {
    const res = await templates.callTemplatePageData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createTemplate = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await templates.createTemplate(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteTemplate = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await templates.deleteTemplate(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateTemplate = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await templates.updateTemplate(data);
  } catch (err: any) {
    throw err;
  }
};

/**
 * hooks
 * @param params
 */
export const useTemplates = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_get_call_template, params],
    () => getTemplates(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useTemplate = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_call_template_view, params],
    () => getTemplate(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params?.id,
    },
  );
};
export const useCallTemplatePageData = (params?: TParams) => {
  return useQuery([queryKeys.admin_get_call_template_page_data, params], () =>
    callTemplatePageData(params),
  );
};
export const useCreateTemplate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createTemplate<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useDeleteTemplate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteTemplate<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useUpdateTemplate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateTemplate<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
