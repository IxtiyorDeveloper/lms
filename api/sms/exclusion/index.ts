import axios from "../../";
import { IData, IExclusion, IExclusionPageData, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  pageData: async (): IData<IExclusionPageData> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_exclusion_page_data",
    }),
  getAll: async (params?: TParams): IData<IExclusion[]> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_exclusion_index",
      query_params: {
        type: null,
        expand: "user",
      },
    }),
  save: async (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_exclusion_save",
      query_params: {
        project: params?.project,
        type: params?.type,
        user_id: params?.user_id,
      },
      body: params,
    }),
  view: async (params?: TParams): IData<IExclusion> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_exclusion_view",
      query_params: {
        ...params,
        user_id: +params?.user_id,
        expand: "user.userProfile.avatar.children",
        type: params?.type,
        project: params?.project,
      },
    }),
  viewCallPageData: async (params?: TParams): IData<IExclusion> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_exclusion_view",
      query_params: {
        ...params,
        user_id: +params?.user_id,
        expand: "user.userProfile.avatar.children",
        type: params?.type,
        project: params?.project,
      },
    }),
  delete: async (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_exclusion_delete",
      query_params: params?.query_params,
    });
  },
};
