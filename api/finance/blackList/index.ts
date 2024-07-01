import axios from "../..";
import { IData, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  getBlackList: async (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_grouped_group_contact_black_list",
      query_params: params?.query_params,
    });
  },
};
