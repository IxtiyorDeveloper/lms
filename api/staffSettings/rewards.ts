import axios from "..";
import { IData, IFetchList, TParams } from "types";
import { PROJECT_LMS } from "../../constants";
import { reward_expand } from "./expands";
import { IStaffReward } from "types/staffSettings";

export default {
  list: (params?: TParams): IData<IFetchList<IStaffReward>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_reward_index",
      query_params: {
        expand: reward_expand,
        ...params?.query_params,
      },
    });
  },
  give: (params?: TParams): IData<IStaffReward> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_reward_give",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  cancel: (params?: TParams): IData<IStaffReward> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_reward_cancel",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  approve: (params?: TParams): IData<IStaffReward> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_reward_approve",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  restore: (params?: TParams): IData<IStaffReward> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_reward_restore",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
