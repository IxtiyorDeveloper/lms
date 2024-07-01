import axios from "../";
import { IData, IPromiseData, TParams } from "types";
import { ILifeCyclePageData, LifeCycle } from "types/lifeCycle";
import { PROJECT_LMS } from "../../constants";

export default {
  getLifeCyclePageData: (params?: TParams): IData<ILifeCyclePageData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_life_cycle_page_data",
      query_params: params?.query_params,
    });
  },
  getLifeCycleList: (params?: TParams): IData<IPromiseData<LifeCycle>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_life_cycle",
      query_params: {
        ...params,
        page: params?.page || 1,
        "per-page": params?.pageSize || 20,
      },
    });
  },
  getLifeCycleView: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_life_cycle_view",
      query_params: params?.query_params,
    });
  },
};
