import axios from ".";
import {
  ICallHistory,
  ICallSearch,
  IData,
  IFetchList,
  IOperatorCallHistiry,
  TParams,
} from "types";
import { PROJECT_LMS } from "../constants";

export default {
  getUsers: (params?: TParams): IData<ICallSearch> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_index",
      ...params,
    }),
  getStaff: (params?: TParams, config?: TParams): IData<any> =>
    axios.post(
      "/v1",
      {
        project: PROJECT_LMS,
        action: "admin_call_get_staff",
        ...params,
      },
      config
    ),
  callHistory: (params?: TParams, config?: TParams): IData<ICallHistory[]> =>
    axios.post(
      "/v1",
      {
        project: PROJECT_LMS,
        action: "admin_call_history",
        ...params,
      },
      config
    ),
  operatorHistory: (
    params?: TParams,
    page?: number
  ): IData<IFetchList<IOperatorCallHistiry>> =>
    axios.post("/v1", {
      project: "lms-v2",
      action: "admin_call_operator_calls",
      query_params: { ...params?.query_params, page },
      body: params?.body,
    }),
};
