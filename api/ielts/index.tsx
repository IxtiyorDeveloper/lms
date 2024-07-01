import axios from "../";
import { TParams } from "types";
export default {
  createTicketUrl: (params?: TParams) => {
    return axios.post("/v1", {
      project: "ielts",
      action: "get_create_ticket_url",
      query_params: params?.query_params,
    });
  },
};
