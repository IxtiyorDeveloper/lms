import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import examResults from "api/examResults";
import { queryKeys } from "constants/queryKeys";
import { IExamStudenResult } from "types/exam/index";
import { validationErrorHandler } from "utils";

export const getExamData = async (params: TParams) => {
  try {
    const res = await examResults.getData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const admin_mock_groups = async (params: TParams) => {
  try {
    const res = await examResults.admin_mock_groups(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const getGroupMockExamData = async (params: TParams) => {
  try {
    const res = await examResults.getGroupMockExamData(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getGroupExamData = async (params: TParams) => {
  try {
    const res = await examResults.getGroupData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getExamPermissions = async (params: TParams) => {
  try {
    const res = await examResults.permissions(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getExamResults = async (params: TParams) => {
  try {
    const res = await examResults.getExamByStatus(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getExamResultsStudents = async (params: TParams) => {
  try {
    const res = await examResults.getExamStudents(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const changeComment = async (params: TParams): Promise<void> => {
  try {
    const res = await examResults.changeComment(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const changeExamResults = async (params: TParams): Promise<void> => {
  try {
    const res = await examResults.changeExamScore(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const changeExamProcessStatus = async (
  params: TParams
): Promise<void> => {
  try {
    const res = await examResults.changeExamProcessStatus(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const setExamAttendance = async (params: TParams): Promise<void> => {
  try {
    const res = await examResults.setExamAttendance(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const examPaper = async (
  params: TParams
): Promise<IExamStudenResult> => {
  try {
    const res = await examResults.examPaper(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useExamData = (params: TParams) => {
  return useQuery([queryKeys.exam_data, params], () => getExamData(params), {
    enabled: !!params?.level_id,
  });
};

export const useAdminMockGroups = (params: TParams) => {
  return useQuery([queryKeys.admin_mock_groups, params], () =>
    admin_mock_groups(params)
  );
};

export const useGroupMockExamData = (params: TParams) => {
  return useQuery([queryKeys.admin_mock_inside_group, params], () =>
    getGroupMockExamData(params)
  );
};

export const useExamPermissions = (params: TParams) => {
  return useQuery(
    ["exam-permissions", params],
    () => getExamPermissions(params),
    {
      enabled: params?.enabled,
    }
  );
};
export const useGroupExamData = (params: TParams) => {
  return useQuery(
    [queryKeys.group_exam_data, params],
    () => getGroupExamData(params),
    {
      // enabled: !!params?.id,
    }
  );
};
export const useExamResultsByStatus = (params: TParams) => {
  return useQuery([queryKeys.group_exam_students, params], () =>
    getExamResults(params)
  );
};

export const useExamResultStudentsByStatus = (params: TParams) => {
  return useQuery(
    [queryKeys.group_exam_students_contacts, params],
    () => getExamResultsStudents(params),
    {
      enabled: !!params.user_id.length,
    }
  );
};

export const useGetExamPaper = (params: TParams) => {
  return useQuery(["get_exam_paper", params], () => examPaper(params), {
    enabled: !!params.enabled,
  });
};

export const useChangeExamComment = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeComment(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useChangeExamScore = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeExamResults(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useChangeExamProcessStatus = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeExamProcessStatus(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useSetExamAttendance = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return setExamAttendance(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
