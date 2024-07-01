import axios from "../../";
import { IData, IPromiseData, TParams } from "types";
import { PROJECT_LMS } from "constants/projects";
import { ICallStatistics, IStatisticsTotal } from "types/statistics/call";

export default {
  getCallList: (
    params?: TParams,
  ): IData<
    IPromiseData<ICallStatistics, IStatisticsTotal[], IStatisticsTotal[]>
  > => {
    const { pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_call_index",
      query_params: {
        ...args,
        "per-page": pageSize,
      },
      body: params?.body,
    });
  },
};
