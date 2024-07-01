import axios from "../";
import { IData, TParams } from "types";
import {
  IAllNotifications,
  INotification,
  SingleNotification,
} from "types/notification";

export default {
  getNotifications: (params?: TParams): IData<INotification> => {
    return axios.post("/v1", {
      project: "application",
      action: "get_my_web_notifications",
      query_params: params?.query_params,
    });
  },
  getAllNotifications: (params?: TParams): IData<IAllNotifications> => {
    return axios.post("/v1", {
      project: "application",
      action: "get_my_notifications_v2",
      query_params: params?.query_params,
    });
  },
  getNotification: (params?: TParams): IData<SingleNotification> => {
    return axios.post("/v1", {
      project: "application",
      action: "get_notification_by_id",
      query_params: params?.query_params,
    });
  },
  readAll: (params?: TParams) => {
    return axios.post("/v1", {
      project: "application",
      action: "notification_mark_as_read_all",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
