import axios from "../";
import { TParams } from "types";
import { PROJECT_LMS } from "../../constants";
export default {
  setPrice: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_course_set_prices",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
