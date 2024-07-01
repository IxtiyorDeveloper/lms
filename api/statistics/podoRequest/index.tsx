import axios from "../../";
import { IData, IPromiseData, TParams } from "types";
import { PROJECT_LMS } from "constants/projects";
import {
  IPodoRequest,
  IReviewerGroup,
  ISinglePodoRequest,
} from "types/statistics/podoRequest";

export default {
  getPodoRequestStatistics: (
    params?: TParams,
  ): IData<IPromiseData<IPodoRequest>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_podo_requests",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getPodoRequestStatistic: (params?: TParams): IData<ISinglePodoRequest> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_podo_request",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getRequestReviewerGroups: (params?: TParams): IData<IReviewerGroup[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_podo_request_reviewer_groups",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  createPodoRequest: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_podo_request_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  updatePodoRequest: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_podo_request_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deletePodoRequest: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_podo_request_delete",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
