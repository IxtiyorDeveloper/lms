import axios from "../../index";
import { IData, IFetchList, TBranch, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  getAll: (params?: TParams): IData<IFetchList<TBranch[]>> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_branch_index",
      query_params: {
        region_id: params?.region_id,
        expand: "room_count,coverFile,branchFiles",
        page: params?.page || 1,
        "per-page": params?.pageSize || 20,
      },
    }),
  save: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_branch_create",
      ...params,
    }),
  update: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_branch_update",
      ...params,
    }),
  getOne: (params?: TParams): IData<TBranch> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_branch_view",
      ...params,
    }),
  delete: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_branch_delete",
      ...params,
    }),
};
