import axios from ".";
import { TParams } from "types";

export default {
  redirect: (params?: TParams) =>
    axios.post(
      "/redirect"
      //{
      //       project: PROJECT_LMS,
      //       action: "admin_grouped_stop_calculation",
      //       query_params: {
      //         contact_id: params?.id,
      //       },
      //       body: params?.body,
      //     }
    ),
};
