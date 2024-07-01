import axios from "..";
import { IData, TParams } from "types";
import { PROJECT_LMS } from "../../constants";
import { initial_data_expand, registering_list_expand } from "./expands";
import { IRegisteringData, IStaffInitialData } from "types/staffSettings";

export default {
  getListOfRegistering: (params?: TParams): IData<IRegisteringData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_registering_index",
      query_params: {
        expand: registering_list_expand,
        ...params?.query_params,
      },
    });
  },
  getInitialData: (params?: TParams): IData<IStaffInitialData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_get_initial_data",
      query_params: {
        expand: initial_data_expand,
        ...params?.query_params,
      },
    });
  },
  sendRequest: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_registering_send_info_request",
      query_params: {
        ...params?.query_params,
      },
    });
  },
  createStaff: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_create_staff",
      query_params: {
        ...params?.query_params,
      },
      body: {
        ...params?.body,
      },
    });
  },
  activateStaff: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_rbac_staff_activate_staff",
      query_params: {
        ...params?.query_params,
      },
      body: {
        ...params?.body,
      },
    });
  },
};
