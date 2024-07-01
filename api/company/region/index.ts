import axios from "../../index";
import { IData, IFetchList, IRegion, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  getAll: (params?: TParams): IData<IFetchList<IRegion[]>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_region_index",
      query_params: {
        expand: "branch_count,room_count,branches.coverFile",
        page: params?.page || 1,
        "per-page": params?.pageSize || 20,
      },
    });
  },
  save: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_region_create",
      ...params,
    }),
  update: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_region_update",
      ...params,
    }),
  getOne: (params?: TParams): IData<IRegion> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_region_view",
      query_params: {
        id: params?.id,
      },
    }),
  delete: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_region_delete",
      ...params,
    }),
};
