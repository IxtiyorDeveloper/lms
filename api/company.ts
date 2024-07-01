import axios from ".";
import { TParams } from "../types";
import { PROJECT_LMS } from "../constants";

export default {
  login: (param?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_one_time_login",
      query_params: {
        key: param?.key,
      },
    }),
};
