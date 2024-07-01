import { TParams } from "types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import referral from "../../api/lead/referral";

export const getReferralIndex = async (params?: TParams) => {
  try {
    const res = await referral.referralIndex(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getReferralPageCounts = async (params?: TParams) => {
  try {
    const res = await referral.referralPageData(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const getReferralStatistics = async (params?: TParams) => {
  try {
    const res = await referral.referralStatistics(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const useReferralIndex = (params?: TParams) => {
  return useQuery([queryKeys.admin_referral_index, params], () =>
    getReferralIndex(params),
  );
};

export const useReferralPageData = (params?: TParams) => {
  return useQuery([queryKeys.admin_referral_page_data, params], () =>
    getReferralPageCounts(params),
  );
};

export const useReferralStatistics = (params?: TParams) => {
  return useQuery([queryKeys.admin_referral_statistics, params], () =>
    getReferralStatistics(params),
  );
};
