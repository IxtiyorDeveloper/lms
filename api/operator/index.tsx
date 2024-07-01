import axios from "../";
import { IData, IPromiseData, TParams } from "types";
import { IOperator } from "../../types";
import { PROJECT_LMS } from "../../constants";

export default {
  getOperators: (params?: TParams): IData<IPromiseData<IOperator>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_operator_list",
      query_params: {
        ...params?.query_params,
        page: params?.query_params?.page || 1,
        "per-page": params?.query_params?.pageSize || 20,
      },
    });
  },
  changePassword: (params?: TParams): IData<IOperator> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_operator_get_with_user",
    });
  },
  createOperator: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_operator_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deleteOperator: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_operator_delete",
      query_params: params?.query_params,
    });
  },
  getOperator: (params?: TParams): IData<IOperator> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_operator_view",
      query_params: params?.query_params,
    });
  },
  updateOperator: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_call_operator_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
