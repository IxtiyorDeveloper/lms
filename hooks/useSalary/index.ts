import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import salary from "api/finance/salary";
import { toast } from "react-toastify";
import { setSalary, store } from "store";
import { queryKeys } from "constants/queryKeys";
import hover from "api/finance/salary/hover";
import { validationErrorHandler } from "../../utils";

/**
 * actions
 * @param params
 */
export const getSalaryMain = async (params?: TParams) => {
  try {
    const res = await salary.getSalaryMain(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const giveSalaryLastMonths = async (params?: TParams) => {
  try {
    const res = await salary.giveSalaryLastMonths(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getDetailedSalaryGroup = async (params?: TParams) => {
  try {
    const res = await hover.getDetailedSalaryGroup(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const getCoverTeachers = async (params?: TParams) => {
  try {
    const res = await salary.getCoverTeachers(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const getCoverTeacher = async (params?: TParams) => {
  try {
    const res = await salary.getCoverTeacher(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const getCoverTeachersPageData = async (params?: TParams) => {
  try {
    const res = await salary.getCoverTeacherPageData(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const createTeacherCover = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.createTeacherCover(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteTeacherCover = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await salary.deleteCoverTeacher(data);
  } catch (err: any) {
    throw err;
  }
};
export const createSalaryComponent = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.createSalaryComponent(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteSalaryComponent = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.deleteSalaryComponent(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateSalaryMain = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.updateSalaryMain(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const giveSalary = async <T extends TParams>(data: T): Promise<void> => {
  try {
    const res = await salary.giveSalary(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const salaryPageData = async (params?: TParams) => {
  try {
    const res = await salary.getSalaryPageData(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const saveDetailedConfig = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.saveDetailedConfig(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteDetailedCoverTeacher = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.deleteDetailedCoverTeacher(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createDetailedCoverTeacher = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.createDetailedCoverTeacher(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const coverTeacherChangeDescription = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.coverTeacherChangeDescription(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const giveAllSalary = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await salary.giveAllSalary(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getCoverTeacherSettings = async (params?: TParams) => {
  try {
    const res = await salary.getCoverTeacherSettings(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const getDetailedFormData = async (params?: TParams) => {
  try {
    const res = await salary.getDetailedFormData(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
export const getDetailedCoverTeacher = async (params?: TParams) => {
  try {
    const res = await salary.getDetailedCoverTeacher(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.exception.message);
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useDetailedSalaryGroup = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_salary_detailed_salary_group, params],
    () => getDetailedSalaryGroup(params),
  );
};

export const useSalaryLastMonths = (params?: TParams) => {
  return useQuery([queryKeys.admin_finance_salary_last_months, params], () =>
    giveSalaryLastMonths(params),
  );
};
export const useSalaryMain = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_salary_main_index, params],
    () => getSalaryMain(params),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        store.dispatch(setSalary(data));
      },
      ...params,
      // enabled
    }
  );
};
export const useCoverTeachers = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_salary_cover_index, params],
    () => getCoverTeachers(params),
    {
      enabled: true,
    }
  );
};
export const useCoverTeacher = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_salary_cover_view, params],
    () => getCoverTeacher(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};

export const useCoverTeacherPageData = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_salary_cover_page_data, params],
    () => getCoverTeachersPageData(params),
    {
      enabled: true,
    }
  );
};
export const useCreateTeacherCover = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createTeacherCover<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteCoverTeacher = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteTeacherCover<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useCreateSalaryComponent = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createSalaryComponent<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteSalaryComponent = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteSalaryComponent<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useUpdateSalaryMain = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateSalaryMain<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useGiveSalary = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return giveSalary<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSalaryPageData = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_salary_salary_component_page_data, params],
    () => salaryPageData(params),
    {
      enabled: params?.enabled,
    }
  );
};

export const useSaveDetailedConfig = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveDetailedConfig<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useCreateDetailedCoverTeacher = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createDetailedCoverTeacher<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useCoverTeacherChangeDescription = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return coverTeacherChangeDescription<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useGiveAllSalary = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return giveAllSalary<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteDetailedCoverTeacher = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteDetailedCoverTeacher<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useCoverTeacherSettings = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_v1_finance_salary_detailed_cover_config_page_data, params],
    () => getCoverTeacherSettings(params),
    {
      keepPreviousData: true,
    }
  );
};

export const useGetDetailedCoverTeacherFormData = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_v1_finance_salary_detailed_cover_form_data, params],
    () => getDetailedFormData(params),
    {
      keepPreviousData: false,
      enabled: !!params?.body?.date && !!params?.body?.assignment_id,
    }
  );
};

export const useGetDetailedCoverTeacher = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_v1_finance_salary_detailed_cover_index, params],
    () => getDetailedCoverTeacher(params),
    {
      keepPreviousData: true,
    }
  );
};
