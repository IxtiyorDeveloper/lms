import axios from "../../";
import { IData, IFinancePageData, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  getConfigPageData: async (params?: TParams): IData<IFinancePageData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_config_page_data",
      query_params: {
        role_id: params?.role_id,
        shift_id: params?.shift_id?.id,
      },
    });
  },
  save: async (params?: TParams): IData<boolean> => {
    const roleId = params?.role_id;
    const shift_id = params?.shift_id;
    delete params?.role_id;
    delete params?.shift_id;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_config_save",
      query_params: {
        role_id: roleId,
        shift_id,
      },
      body: params,
    });
  },
};
