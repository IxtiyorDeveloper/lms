import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import lifeCycle from "api/lifeCycle";
import { queryKeys } from "constants/queryKeys";

export const getLifeCyclePageData = async (params?: TParams) => {
  try {
    const res = await lifeCycle.getLifeCyclePageData(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getLifeCycleList = async (params?: TParams) => {
  try {
    const res = await lifeCycle.getLifeCycleList(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getLifeCycleView = async (params?: TParams) => {
  try {
    const res = await lifeCycle.getLifeCycleView(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useLifeCyclePageData = (params?: TParams) => {
  return useQuery([queryKeys.admin_company_life_cycle_page_data, params], () =>
    getLifeCyclePageData(params)
  );
};

export const useLifeCycleList = (params?: TParams) => {
  return useQuery([queryKeys.admin_company_life_cycle, params], () =>
    getLifeCycleList(params)
  );
};

export const useLifeCycleView = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_company_life_cycle_view, params],
    () => getLifeCycleView(params),
    {
      enabled: !!params?.query_params?.id,
    }
  );
};
