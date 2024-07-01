import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import courses from "api/course";
import { queryKeys } from "constants/queryKeys";

export const getCourses = async (params?: TParams) => {
  try {
    const res = await courses.getCourses(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getCourse = async (params?: TParams) => {
  try {
    const res = await courses.getCourse(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createCourse = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    const res = await courses.createCourse(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteCourse = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await courses.deleteCourse(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateCourse = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await courses.updateCourse(data);
  } catch (err: any) {
    throw err;
  }
};
export const useCourses = (params?: TParams) => {
  return useQuery([queryKeys.admin_course_index, params], () =>
    getCourses(params)
  );
};
export const useCourse = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_course_view, params],
    () => getCourse(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
export const useCreateCourse = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createCourse<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useDeleteCourse = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteCourse<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useUpdateCourse = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateCourse<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
