import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import statistics from "api/statistics";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.mainCard(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getKpiStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.kpi(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStaffMotivation = async (params?: TParams) => {
  try {
    const res = await statistics.staffMotivation(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getFreshmanLost = async (params?: TParams) => {
  try {
    const res = await statistics.freshmanLost(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getLostList = async (params?: TParams) => {
  try {
    const res = await statistics.lost(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getFreshmanList = async (params?: TParams) => {
  try {
    const res = await statistics.freshman(params);
    return res.data.result;
  } catch (err: any) {
    if (!params?.toast_off) {
      validationErrorHandler({ err });
    }
    throw err;
  }
};
export const getFreshmanLostPageData = async (params?: TParams) => {
  try {
    const res = await statistics.freshmanLostPageData(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getPodoList = async (params?: TParams) => {
  try {
    const res = await statistics.podo(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getTeacherLostList = async (params?: TParams) => {
  try {
    const res = await statistics.teacherLost(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.student(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getNewStudentStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.newStudent(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getWaitingListStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.waitingList(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getByNativeLanguageStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.waitingList(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getByGenderStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.waitingList(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getLeadStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.lead(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getIncomeStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.income(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

// ------ group statistics ------ //

export const getGroupsStatistics = async (params?: TParams) => {
  try {
    const res = await statistics.group(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getSMSCounts = async (params?: TParams) => {
  try {
    const res = await statistics.smsCounts(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getSMSPageData = async (params?: TParams) => {
  try {
    const res = await statistics.smsPageData(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getSMSList = async (params?: TParams) => {
  try {
    const res = await statistics.smsList(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useStatistics = (params?: TParams) => {
  return useQuery([queryKeys.main_card, params], () => getStatistics(params), {
    enabled:
      typeof params?.enabled === "boolean"
        ? params?.enabled &&
        !!params?.query_params?.from_date &&
        !!params?.query_params?.to_date
        : !!params?.query_params?.from_date && !!params?.query_params?.to_date,
  });
};
export const useSMSList = (params?: TParams) => {
  return useQuery([queryKeys.sms_list, params], () => getSMSList(params), {
    keepPreviousData: true,
  });
};
export const useKpiStatistics = (params?: TParams, title?: string) => {
  return useQuery(
    [title || queryKeys.kpi_statistics, params],
    () => getKpiStatistics(params),
    {
      keepPreviousData: true,
      enabled: params?.role_id === undefined ? true : !!params?.role_id,
    },
  );
};
export const useStaffMotivation = (params?: TParams, title?: string) => {
  return useQuery(
    [title || queryKeys.staff_motivation, params],
    () => getStaffMotivation(params),
    {
      keepPreviousData: true,
      // enabled: params?.role_id === undefined ? true : !!params?.role_id,
    },
  );
};
export const useFreshmanLost = (params?: TParams) => {
  return useQuery([queryKeys.income_lost, params], () =>
    getFreshmanLost(params),
  );
};
export const useFreshmanLostPageData = (params?: TParams) => {
  return useQuery([queryKeys.freshman_lost_page_data, params], () =>
    getFreshmanLostPageData(params),
  );
};
export const useLostList = (params?: TParams) => {
  return useQuery([queryKeys.lost_list, params], () => getLostList(params), {
    keepPreviousData: true,
  });
};
export const useFreshmanList = (params?: TParams) => {
  return useQuery(
    [queryKeys.freshman_list, params],
    () => getFreshmanList(params),
    {
      keepPreviousData: true,
      onSuccess: params?.onSuccess,
      onError: params?.onError,
      enabled: params?.enabled,
    },
  );
};
export const usePodoList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_statistics_podo_index, params],
    () => getPodoList(params),
    {
      keepPreviousData: true,
    },
  );
};

export const useTeacherLostList = (params?: TParams) => {
  return useQuery(
    [queryKeys.teacher_lost_list, params],
    () => getTeacherLostList(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useStudentStatistics = (params?: TParams) => {
  return useQuery([queryKeys.student_statistics, params], () =>
    getStudentStatistics(params),
  );
};
export const useNewStudentStatistics = (params?: TParams) => {
  return useQuery([queryKeys.new_student_statistics, params], () =>
    getNewStudentStatistics(params),
  );
};
export const useWaitingListStatistics = (params?: TParams) => {
  return useQuery([queryKeys.waiting_list_statistics, params], () =>
    getWaitingListStatistics(params),
  );
};
export const useLeadStatistics = (params?: TParams) => {
  return useQuery([queryKeys.lead_statistics, params], () =>
    getLeadStatistics(params),
  );
};
export const useByLanguageStatistics = (params?: TParams) => {
  return useQuery([queryKeys.by_native_language_statistics, params], () =>
    getByNativeLanguageStatistics(params),
  );
};
export const useByGenderStatistics = (params?: TParams) => {
  return useQuery([queryKeys.by_gender_statistics, params], () =>
    getByGenderStatistics(params),
  );
};
export const useIncomeStatistics = (params?: TParams) => {
  return useQuery([queryKeys.income_statistics, params], () =>
    getIncomeStatistics(params),
  );
};

export const useSmsCounts = (params?: TParams) => {
  return useQuery([queryKeys.sms_counts, params], () => getSMSCounts(params));
};

export const useSmsPageData = (params?: TParams) => {
  return useQuery([queryKeys.sms_statistics_page_data, params], () =>
    getSMSPageData(params),
  );
};

export const useGroupStatistics = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_statistics_dashboard_statistics_group, params],
    () => getGroupsStatistics(params),
  );
};
