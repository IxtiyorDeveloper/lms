import axios from "../../index";
import { IData, IFetchList, IRoom, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";
export default {
  getAll: (params?: TParams): IData<IFetchList<IRoom>> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_room_index",
      ...params,
      query_params: {
        ...params?.query_params,
        page: params?.query_params?.page || 1,
        "per-page": params?.query_params?.pageSize || 20,
      },
    }),
  getOne: (params?: TParams): IData<IRoom> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_room_view",
      query_params: {
        ...params,
        id: params?.id,
      },
    }),
  save: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_room_create",
      ...params,
    }),
  update: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_room_update",
      ...params,
    }),
  delete: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_room_delete",
      ...params,
    }),
  changeOrder: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_room_reorder",
      ...params,
    }),
};
