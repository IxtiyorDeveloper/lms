import axios from "../../index";
import { IData, IFetchList, TParams, IShop, IStockCategory } from "types";

export default {
  getShopNew: async (params?: TParams): IData<IFetchList<IShop>> => {
    return axios.post("/v1", {
      project: "stock",
      action: "admin_order_index",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  admin_shop_statistics: async (params?: TParams): IData<IStockCategory[]> => {
    return axios.post("/v1", {
      project: "stock",
      action: "admin_shop_statistics",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getShopGive: async (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "stock",
      action: "admin_order_give",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
