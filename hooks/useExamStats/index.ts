import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import examResults from "api/examResults";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getExamPageStats = async (params: TParams) => {
  try {
    const res = await examResults.getStats(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const admin_mock_stats = async (params: TParams) => {
  try {
    const res = await examResults.admin_mock_stats(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getExamUser = async (params?: TParams) => {
  try {
    const res = await examResults.getExamUser(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getAverageTeacher = async (params: TParams) => {
  try {
    const res = await examResults.getAverageTeacher(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getMockAverageTeacher = async (params: TParams) => {
  try {
    const res = await examResults.getMockAverageTeacher(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getPassRateTeacher = async (params: TParams) => {
  try {
    const res = await examResults.getPassRateTeacher(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getMockPassRateTeacher = async (params: TParams) => {
  try {
    const res = await examResults.getMockPassRateTeacher(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const examProgress = async (params: TParams) => {
  try {
    const res = await examResults.examProgress(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const mockExamDataTeacher = async (params: TParams) => {
  try {
    const res = await examResults.mockExamDataTeacher(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getExamPageData = async (params: TParams) => {
  try {
    const res = await examResults.getExamPageData(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useExamCounts = (params: TParams) => {
  return useQuery(
    [queryKeys.exam_counts, params],
    () => getExamPageStats(params),
    {
      enabled: !!params?.month,
    }
  );
};

export const useAverageTeacher = (params: TParams) => {
  return useQuery(
    [queryKeys.admin_exam_info_get_average_teacher, params],
    () => getAverageTeacher(params),
    {
      enabled: !!params?.enabled,
    }
  );
};
export const useMockAverageTeacher = (params: TParams) => {
  return useQuery(
    [queryKeys.admin_mock_exam_info_get_average_teacher, params],
    () => getMockAverageTeacher(params),
    {
      enabled: !!params?.enabled,
    }
  );
};
export const usePassRateTeacher = (params: TParams) => {
  return useQuery(
    [queryKeys.admin_exam_info_pass_rate_teacher, params],
    () => getPassRateTeacher(params),
    {
      enabled: !!params?.enabled,
    }
  );
};
export const useMockPassRateTeacher = (params: TParams) => {
  return useQuery(
    [queryKeys.admin_mock_exam_info_pass_rate_teacher, params],
    () => getMockPassRateTeacher(params),
    {
      enabled: !!params?.enabled,
    }
  );
};
export const useExamProgress = (params: TParams) => {
  return useQuery(
    [queryKeys.admin_exam_info_exam_progress, params],
    () => examProgress(params),
    {
      enabled: !!params?.enabled,
    }
  );
};

export const useExamPageData = (params: TParams) => {
  return useQuery([queryKeys.v1_system_exam_exam_stats, params], () =>
    getExamPageData(params)
  );
};

export const useAdminMockStats = (params: TParams) => {
  return useQuery(
    [queryKeys.admin_mock_stats, params],
    () => admin_mock_stats(params),
    {
      enabled: !!params?.enabled,
    }
  );
};
export const useExamUser = (params?: TParams) => {
  return useQuery([queryKeys.admin_get_exam_user, params], () =>
    getExamUser(params)
  );
};

export const useMockExamDataTeacher = (params: TParams) => {
  return useQuery(
    [queryKeys.admin_mock_exam_get_average_by_teacher, params],
    () => mockExamDataTeacher(params)
  );
};
