import { IData, TAssignment, TParams } from "types";
import { IGetDetailed } from "types/finance/salary";
import axios from "../../..";
import { PROJECT_LMS } from "constants/projects";

export default {
  getDetailedSalaryGroup: async (params?: TParams): IData<TAssignment> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_view",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
