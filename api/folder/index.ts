import { ResponseAxios, TParams } from "types";
import axios from "../";

export default {
  getRoute: async (
    params?: TParams
  ): Promise<ResponseAxios<{ url: string; originalUrl: string }>> => {
    return axios.post("/folder/routes", params);
  },
};
