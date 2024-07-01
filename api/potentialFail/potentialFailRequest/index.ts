import axios from "../../";
import { IData, IPromiseData, TParams } from "types";
import { PROJECT_LMS } from "constants/projects";
import {
  IPotentialFailRequest,
  IPotentialFailReviewerGroup,
  ISinglePotentialFailRequest,
} from "types/potentialFail/potentialFailRequest";

export default {
  getPotentialFailRequests: (
    params?: TParams,
  ): IData<IPromiseData<IPotentialFailRequest>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_potential_fail_requests",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getPotentialFailRequest: (
    params?: TParams,
  ): IData<ISinglePotentialFailRequest> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_potential_fail_request",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getPFRequestReviewerGroups: (
    params?: TParams,
  ): IData<IPotentialFailReviewerGroup[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_potential_fail_request_reviewer_groups",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  createPotentialFailRequest: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_potential_fail_request_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  updatePotentialFailRequest: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_potential_fail_request_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deletePotentialFailRequest: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_academic_potential_fail_request_delete",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
