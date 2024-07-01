import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import absentStudents from "api/absentStudents";
import axios from "axios";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getAbsentStudents = async (params?: TParams) => {
  try {
    const res = await absentStudents.getAbsentStudents(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useAbsentStudents = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_grouped_group_contact_absent_student, params],
    () => getAbsentStudents(params),
    {
      keepPreviousData: false,
    }
  );
};

let source = axios.CancelToken.source();
export const getRedList = async (params?: TParams) => {
  try {
    source && source?.cancel("Operation canceled by the user.");
    source = axios.CancelToken.source();
    const res = await absentStudents.getRedList(params, source.token);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getRedListStatistics = async (params?: TParams) => {
  try {
    const res = await absentStudents.getRedListStatistics(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useRedList = (params?: TParams) => {
  return useQuery([queryKeys.redList, params], () => getRedList(params), {
    keepPreviousData: true,
    staleTime: 6000,
  });
};
export const useRedListStatistics = (params?: TParams) => {
  return useQuery(
    [queryKeys.redListStatistics, params],
    () => getRedListStatistics(params),
    { keepPreviousData: true }
  );
};
export const getStudentUnits = async (params?: TParams) => {
  try {
    const res = await absentStudents.getUserUnits(params);
    if (params?.isMerged) {
      let a = res.data.result.sort(
        (a, b) => a.unit?.system_order - b.unit?.system_order
      );
      if (a) {
        for (let i = 0; i < a?.length ?? 0; i++) {
          if (a[i]?.opening_date === a[i - 1]?.opening_date) {
            a[i - 1] = {
              ...a[i - 1],
              child: a[i],
            };
            a.splice(i, 1);
          }
        }
      }
      return a;
    }
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const changeRedListCount = async <T extends TParams>(params?: T) => {
  try {
    const res = await absentStudents.changeRedListCount(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const addLabelAll = async <T extends TParams>(params?: T) => {
  try {
    const res = await absentStudents.addLabelAll(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const addLabelAllFailed = async <T extends TParams>(params?: T) => {
  try {
    const res = await absentStudents.addLabelAllFailed(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getStudentsByMentor = async (params?: TParams) => {
  try {
    const res = await absentStudents.getStudentsByMentor(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const groupContactLsatAttendance = async <T extends TParams>(
  params?: T
) => {
  try {
    const res = await absentStudents.groupContactLsatAttendance(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useStudentUnits = (params?: TParams) => {
  return useQuery(
    [queryKeys.system_student_homeworks, params],
    () => getStudentUnits(params),
    {
      keepPreviousData: true,
    }
  );
};

export const useGroupContactLsatAttendance = (params?: TParams) => {
  return useQuery(
    [queryKeys.group_contact_last_attendance, params],
    () => groupContactLsatAttendance(params),
    {
      keepPreviousData: true,
    }
  );
};
export const useGetAbsentStudentsByMentor = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_grouped_group_contact_absent_student_by_mentor, params],
    () => getStudentsByMentor(params)
  );
};

export const useRedListChangeCount = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeRedListCount<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useAddLabelAll = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return addLabelAll<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useAddLabelAllFailed = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return addLabelAllFailed<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
