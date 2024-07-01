import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import companyFiles from "api/company/companyFiles";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getAllCompanyFiles = async (params?: TParams) => {
  try {
    const res = await companyFiles.getAll(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getAllCompanyCategories = async (params?: TParams) => {
  try {
    const res = await companyFiles.categories(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const saveCompanyFile = async <T extends TParams>(params: T) => {
  try {
    const res = await companyFiles.create(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const addDocumentCategory = async (params: TParams) => {
  try {
    const res = await companyFiles.addCategory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateDocumentCategory = async (params: TParams) => {
  try {
    const res = await companyFiles.updateDocumentCategory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteDocumentCategory = async (params: TParams) => {
  try {
    const res = await companyFiles.deleteCategory(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateCompanyFile = async <T extends TParams>(params: T) => {
  try {
    const res = await companyFiles.update(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteCompanyFile = async <T extends TParams>(params: T) => {
  try {
    const res = await companyFiles.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getOneCompanyFile = async (params?: TParams) => {
  try {
    const res = await companyFiles.getOne(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useCompanyFiles = (params?: TParams) => {
  return useQuery(
    [queryKeys.company_files, params],
    () => getAllCompanyFiles(params),
    {
      keepPreviousData: true,
      ...params,
    }
  );
};
export const useOneCompanyFile = (params?: TParams) => {
  return useQuery(
    [queryKeys.company_file, params],
    () => getOneCompanyFile(params),
    {
      enabled: !!params?.id,
    }
  );
};
export const useAllCompanyCategories = (params?: TParams) => {
  return useQuery([queryKeys.admin_company_file_category, params], () =>
    getAllCompanyCategories(params)
  );
};
export const useSaveCompanyFile = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveCompanyFile<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useAddDocumentCategory = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return addDocumentCategory(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateDocumentCategory = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return updateDocumentCategory(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteDocumentCategory = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return deleteDocumentCategory(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateCompanyFile = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateCompanyFile<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteCompanyFile = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteCompanyFile<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
