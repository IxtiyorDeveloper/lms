import axios from "../";
import { IData, IPromiseData, TParams } from "types";
import { IHoliday } from "types/holiday";
import { PROJECT_LMS } from "../../constants";
export default {
  getHolidays: (params?: TParams): IData<IPromiseData<IHoliday>> => {
    const { page, pageSize, ...args }: any = params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_get_holiday_list",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
      },
    });
  },
  createHoliday: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_holiday_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  createBatchHoliday: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_holiday_batch_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deleteHoliday: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_holiday_delete",
      query_params: params?.query_params,
    });
  },
  getHoliday: (params?: TParams): IData<IHoliday> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_get_holiday_one",
      query_params: params?.query_params,
    });
  },
  getHolidayWithGroup: (params?: TParams): IData<IHoliday> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_holiday_view_with_group",
      query_params: params?.query_params,
    });
  },
  updateHoliday: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_holiday_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
