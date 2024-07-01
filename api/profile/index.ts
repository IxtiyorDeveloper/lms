import axios from "../";
import { IData, IPromiseData, TParams } from "types";
import { ILifeCyclePageData, LifeCycle } from "types/lifeCycle";
import { IActualSalary } from "../../types/finance/salary";
import { PROJECT_LMS } from "../../constants";

export default {
  getClientStaff: (params?: TParams): IData<IActualSalary> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "client_staff_user_salary",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
