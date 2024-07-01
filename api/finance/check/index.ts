import axios from "../../";
import { IData, TParams } from "types";
import { PROJECT_LMS } from "../../../constants";

export default {
  getCheckData: async (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_income_get_check",
      query_params: {
        income_id: params?.income_id,
      },
    });
  },
  getProductCheckData: async (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_income_get_product_check",
      query_params: {
        income_id: params?.income_id,
      },
    });
  },
};
