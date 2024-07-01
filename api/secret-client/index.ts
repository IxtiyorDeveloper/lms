import axios from "../";
import { IData, IFetchList, ISecretClient, TParams } from "types";

export default {
  admin_v1_secret_client_cycle_index: (
    params?: TParams,
  ): IData<IFetchList<ISecretClient>> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_v1_secret_client_cycle_index",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  admin_v1_secret_client_cycle_view: (
    params?: TParams,
  ): IData<ISecretClient> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_v1_secret_client_cycle_view",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  admin_v1_secret_client_cycle_create_update_delete: (
    params?: TParams,
  ): IData<boolean> => {
    return axios.post("/v1", {
      project: "hammer",
      action: params?.action ?? "admin_v1_secret_client_cycle_create",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  admin_v1_secret_client_cycle_update: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_v1_secret_client_cycle_update",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  admin_v1_secret_client_cycle_delete: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_v1_secret_client_cycle_delete",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
