import axios from "../";
import {
  IAppicationStatus,
  ICandidate,
  ICheckCandidatePhoneNumber,
  IData,
  IHRMainGeneral,
  IPromiseData,
  IVacancy,
  ServerResponse,
  TParams,
} from "types";
import { IConfigVacancy } from "types";
export default {
  configVacancy: (params?: TParams): IData<IConfigVacancy[]> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_config_vacancy_index",
      query_params: {
        expand: "candidates",
        fields: "id, status, role_id, candidates.first_name",
      },
    });
  },
  switchVacancy: (params?: TParams): IData<boolean> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_config_vacancy_switch_vacancy",
      query_params: {
        role_id: params?.role_id,
      },
      body: {
        ...params,
        status: params?.status,
      },
    });
  },
  vacancyFormSave: (params?: TParams): IData<IVacancy> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_config_vacancy_vacancy_form_save",
      query_params: {
        role_id: params?.role_id,
      },
      body: {
        ...params,
      },
    });
  },
  vacancyPageData: (params?: TParams): IData<IVacancy> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_config_vacancy_vacancy_page_data",
      query_params: {
        role_id: params?.role_id,
        expand: "stage",
      },
    });
  },
  pixelFormData: (): IData<IPromiseData<any>> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_config_pixel_pixel_form_page_data",
      query_params: {},
    });
  },
  pixelFormSave: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_config_pixel_pixel_form_save",
      query_params: {},
      body: {
        ...params,
      },
    });
  },
  getStatusList: (
    params?: TParams
  ): IData<{
    countList:
      | {
          id: string;
          count: string;
          stage?: string;
        }[]
      | undefined;
    statusList: IAppicationStatus[];
    vacancyList: {
      counts: {
        id: string;
        count: string;
        stage?: string;
      }[];
      vacancies: IVacancy[];
    };
  }> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_get_status_list",
      query_params: {
        expand: "statusList, vacancyList, countList",
        ...params?.query_params,
      },
    });
  },
  mainGeneralIndex: (params?: TParams): IData<IHRMainGeneral> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_index",
      query_params: {
        ...params,
        expand:
          "candidatePhoneNumbers, own_phone_number, age, candidateAvatar.url, candidateDocuments.url,candidateDocuments.name, candidateLabels.responsible, candidateLabels.createdBy, abs.createdBy, ceo_approved, candidateLabels, actionPermissions, labelPermissions, meeting, trainingStages, vacancy, responsible, hired_date",
      },
    });
  },
  checkPhoneNumber: (params?: TParams): IData<ICheckCandidatePhoneNumber> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_check_candidate_by_phone",
      query_params: {
        ...params?.query_params,
        expand: "candidatePhoneNumbers, age, candidateAvatar.url, vacancy",
        fields:
          "id, stage, status, first_name, last_name, description, rejection_type,dob",
      },
      body: params?.body,
    });
  },
  shareVacancy: (params?: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_share_vacancy",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  takeCandidate: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_take_candidate",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  delete: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_delete_applicant",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  merge: (params?: TParams): IData<ICandidate> => {
    return axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_main_general_merge_candidate",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
