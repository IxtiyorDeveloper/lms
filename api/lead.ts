import axios from ".";
import {
  IData,
  IFetchList,
  ILead,
  ILeadHistory,
  ILeadIndexData,
  IUser,
  TParams,
} from "types";
import { PROJECT_LMS } from "../constants";
import { ILeadStatisticsUsers } from "../types/leadActions";

export const adminLeadIndexExpand =
  "source,register.userProfile.avatar,registeredBy,leadActions.createdBy,leavingCategory,responsible.userProfile.avatar";
export default {
  getAll: (params?: TParams): IData<IFetchList<ILead>> => {
    const { page, pageSize, status, ...rest } = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_index",
      query_params: {
        expand: adminLeadIndexExpand,
        ...rest,
        status: status || 200,
        page: +page || 1,
        "per-page": +pageSize || 100,
      },
    });
  },
  admin_lead_change_responsible: (params?: TParams): IData<boolean> => {
    const { page, pageSize, status, ...rest } = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_change_responsible",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getLeadStatistics: (params?: TParams): IData<ILeadStatisticsUsers> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_statistics_by_admin",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getOne: (params?: TParams): IData<ILead> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_view",
      query_params: {
        id: params?.id,
      },
    });
  },
  addLead: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_create",
      body: params,
    });
  },
  leadHistory: (params?: TParams): IData<ILeadHistory[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_history",
      query_params: {
        ...params,
        id: params?.id,
        expand: "createdBy.rbacAssignment.rbacRole,data",
        "per-page": 100,
      },
    });
  },
  deleteLead: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_delete",
      query_params: {
        id: params?.id,
      },
      body: params,
    });
  },
  updateLeadTab: (params?: TParams) => {
    const id = params?.id;
    delete params?.id;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_tab_update",
      body: params,
      query_params: {
        id: id,
      },
    });
  },
  deleteLeadTab: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_tab_delete",
      query_params: {
        id: params?.id,
      },
    });
  },
  getLeadTabs: (params?: TParams): IData<ILead[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_tab_index",
      query_params: params,
    });
  },
  addLeadTab: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_tab_create",
      body: params,
    });
  },
  updateLead: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_update",
      body: {
        ...params,
        status: 300,
      },
      query_params: {
        id: params?.id,
      },
    });
  },
  markAction: (params?: TParams): IData<ILead> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_mark_action",
      body: {
        action: params?.action,
        date: params?.date,
      },
      query_params: {
        id: params?.id,
        expand: adminLeadIndexExpand,
      },
    });
  },
  getAllCreatedByList: (): IData<ILeadIndexData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_search_data",
    });
  },
  changeLeadColor: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_change_color",
      body: {
        color: params?.color,
      },
      query_params: {
        id: params?.id,
        expand: adminLeadIndexExpand,
      },
    });
  },
  changeLeadNote: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_change_comment",
      body: {
        comment: params?.comment,
      },
      query_params: {
        id: params?.id,
        expand: adminLeadIndexExpand,
      },
    });
  },
  validate: (params?: TParams): IData<boolean> =>
    axios.post(
      "/v1",
      {
        project: PROJECT_LMS,
        action: "admin_lead_validate_phone",
        body: params,
      },
      {
        //@ts-ignore
        meta: {
          id: params?.id,
        },
      }
    ),
  leadCallHistory: (params?: TParams): IData<ILead[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_call_history",
      query_params: params,
    });
  },
};
