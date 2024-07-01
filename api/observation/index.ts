import axios from "../";
import { IData, TParams } from "types";
import { PROJECT_HAMMER } from "constants/projects";
import {
  IObservationEnum,
  IMainObservation,
  IObservationStatistics,
  IRankingObservation,
} from "../../types/observation";

export default {
  getObservationList: (params?: TParams): IData<IMainObservation[]> => {
    return axios.post("/v1", {
      project: PROJECT_HAMMER,
      action: "admin_ranking_observation_index",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getObservation: (params?: TParams): IData<IRankingObservation> => {
    return axios.post("/v1", {
      project: PROJECT_HAMMER,
      action: "admin_ranking_observation_view",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  saveObservation: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_HAMMER,
      action: "admin_ranking_observation_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  changeObservationStatus: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_HAMMER,
      action: "admin_ranking_observation_change_status",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  deleteObservation: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_HAMMER,
      action: "admin_ranking_observation_delete",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getObservationEnums: (params?: TParams): IData<IObservationEnum> => {
    return axios.post("/v1", {
      project: PROJECT_HAMMER,
      action: "admin_ranking_observation_enums",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getObservationStatistics: (
    params?: TParams,
  ): IData<IObservationStatistics> => {
    return axios.post("/v1", {
      project: PROJECT_HAMMER,
      action: "admin_ranking_observation_statistics",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getObservationMentorList: (params?: TParams): IData<IMainObservation[]> => {
    return axios.post("/v1", {
      project: PROJECT_HAMMER,
      action: "admin_ranking_observation_mentor_list",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
