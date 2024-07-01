import axios from "../";
import { TParams } from "types";
export default {
  createComplaint: (params?: TParams) => {
    return axios.post("/v1", {
      project: "application",
      action: "send_bug",
      body: params?.body,
    });
  },
};
