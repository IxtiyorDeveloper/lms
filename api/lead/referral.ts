import { IData, TParams } from "types";
import { PROJECT_LMS } from "../../constants";
import axios from "../";
import {
  IReferralIndex,
  IReferralPageData,
  IReferralStatistics,
} from "types/referrals";
import { expandReferral } from "./expand";

export default {
  referralIndex: (params?: TParams): IData<IReferralIndex> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_referral_index",
      body: params?.body,
      query_params: {
        ...params?.query_params,
        expand: expandReferral,
      },
    }),
  referralPageData: (params?: TParams): IData<IReferralPageData> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_referral_page_data",
      body: params?.body,
      query_params: params?.query_params,
    }),
  referralStatistics: (params?: TParams): IData<IReferralStatistics[]> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_lead_referral_statistics",
      body: params?.body,
      query_params: params?.query_params,
    }),
};
