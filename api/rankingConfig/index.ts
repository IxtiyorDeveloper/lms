import axios from "../";
import { IData, IMentorConfig, IPromiseData, TParams } from "types";

export default {
  getMentorRankingConfig: (params?: TParams): IData<IMentorConfig> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_ranking_get_mentor_rank_config",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  setMentorRankingConfig: (params?: TParams): IData<IPromiseData<Boolean>> => {
    return axios.post("/v1", {
      project: "hammer",
      action: "admin_ranking_set_mentor_rank_config",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
