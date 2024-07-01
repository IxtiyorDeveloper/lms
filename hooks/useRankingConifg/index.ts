import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import rankingConfig from "api/rankingConfig";
import { validationErrorHandler } from "utils";

export const getMentorRankingConfig = async (params?: TParams) => {
  try {
    const res = await rankingConfig.getMentorRankingConfig(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const setMentorRankingConfig = async (params?: TParams) => {
  try {
    const res = await rankingConfig.setMentorRankingConfig(params);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const useMentorRankingConfig = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_ranking_get_mentor_rank_config, params],
    () => getMentorRankingConfig(params)
  );
};

export const useSetMentorRankingConfig = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return setMentorRankingConfig(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
