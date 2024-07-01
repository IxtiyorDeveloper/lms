import axios from "../";
import { TParams } from "types";
import { PROJECT_LMS } from "../../constants";

export default {
  changePassword: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_auth_change_password",
      body: params?.body,
    });
  },
};
