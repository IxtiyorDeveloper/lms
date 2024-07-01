import axios from "../";
import { IData, TParams } from "types";

export default {
  getData: (params: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_exam_exam_dates",
      version: "v1",
      query_params: params,
    });
  },
};
