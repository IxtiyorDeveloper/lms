import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import lessonDay from "api/lessonDay";
import { queryKeys } from "constants/queryKeys";

export const getLessonDays = async (params?: TParams) => {
  try {
    const res = await lessonDay.getLessonDays(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getLessonDay = async (params?: TParams) => {
  try {
    const res = await lessonDay.getLessonDay(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const createLessonDay = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await lessonDay.createLessonDay(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteLessonDay = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await lessonDay.deleteLessonDay(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateLessonDay = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await lessonDay.updateLessonDay(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useLessonDays = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_course_lesson_day_index, params],
    () => getLessonDays(params),
    {
      enabled: !!params?.query_params?.course_id,
    }
  );
};
export const useLessonDay = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_course_lesson_day_view, params],
    () => getLessonDay(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
export const useCreateLessonDay = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createLessonDay<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useDeleteLessonDay = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteLessonDay<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useUpdateLessonDay = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateLessonDay<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
