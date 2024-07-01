import { IData, TParams } from "../../../types";
import axios from "../../index";
import { IOfficialCompany } from "../../../types/company";
import { PROJECT_LMS } from "../../../constants";

export default {
  getCurrentCompany: (params?: TParams): IData<IOfficialCompany> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_current",
      query_params: params?.query_params,
      body: params?.body,
    }),
  updateCurrentCompany: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_update_current",
      query_params: params?.query_params,
      body: params?.body,
    }),
  restrictAccess: (params?: TParams) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_restrict_access",
      query_params: params?.query_params,
      body: params?.body,
    }),
};
