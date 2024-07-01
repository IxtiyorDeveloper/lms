import { TParams } from "types";
import { validationErrorHandler } from "utils";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import potentialFail from "api/potentialFail";
import _ from "lodash";

export const getPotentialFailList = async (params?: TParams) => {
  try {
    const res = await potentialFail.getPotentialFailList(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const adminAcademicFallibleGetByMentor = async (params?: TParams) => {
  try {
    const res = await potentialFail.adminAcademicFallibleGetByMentor(params);
    // return res.data.result;
    return {
      ...res.data.result,
      data: _.groupBy(
        res.data.result.data.map((e) => {
          return {
            ...e,
            visible: true,
            average: 10,
            avatar: {
              ...e.userProfile.avatarFile,
              full_url:
                e?.userProfile?.avatarFile?.base_url +
                "/" +
                e?.userProfile?.avatarFile?.path,
              children: e?.userProfile?.avatarFile?.children?.map((i) => {
                return {
                  ...i,
                  full_url: i.base_url + "/" + i.path,
                };
              }),
            },
          };
        }),
        (e) => e.type,
      ),
    };
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const usePotentialFailList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_academic_fallible_index, params],
    () => getPotentialFailList(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useAdminAcademicFallibleGetByMentor = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_academic_fallible_get_by_mentor, params],
    () => adminAcademicFallibleGetByMentor(params),
    {
      keepPreviousData: true,
      enabled: params?.enabled,
    },
  );
};
