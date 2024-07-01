import axios from "../../";
import { IData, IPromiseData, IUser, TParams } from "types";
import { PROJECT_LMS } from "constants/projects";
import { OneStudent } from "types/student";

export default {
  getStatisticsCreateStudent: (
    params?: TParams
  ): IData<IPromiseData<OneStudent, IUser>> => {
    const { pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_created_student",
      query_params: {
        ...args,
        "per-page": pageSize,
      },
      body: params?.body,
    });
  },
};
