import axios from "../";
import { IData, ISystemTaxPageData, TParams } from "types";
import { PROJECT_LMS } from "../../constants";

export default {
  system_tax_device_index: (
    params?: TParams
  ): Promise<{ data: ISystemTaxPageData[] }> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "system_tax_device_index",
      query_params: {
        expand: "decryptedPassword,branch",
      },
    });
  },
  system_tax_receipt_get: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "system_tax_receipt_get",
      // query_params: {
      //   income_group_id: params?.id,
      // },
      query_params: params?.query_params,
    });
  },
  system_tax_receipt_save: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "system_tax_receipt_save",
      query_params: params?.query_params,
      body: {
        receipt: params?.body,
      },
    });
  },
};
