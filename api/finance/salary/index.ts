import axios from "../../index";
import { IData, IUser, TParams } from "types";
import {
  ICoverTeacher,
  ICoverTeacherSettings,
  IDetailedCoverTeacher,
  IDetailedCoverTeacherFormData, IPreviousMonthSalaryData,
  ISalaryMain,
  ISalaryPageData,
} from "types/finance/salary";
import { PROJECT_LMS } from "../../../constants";

export default {
  getSalaryMain: async (params?: TParams): IData<ISalaryMain[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_main_index",
      query_params: params?.query_params,
    });
  },
  getCoverTeachers: async (params?: TParams): IData<ICoverTeacher[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_cover_index",
      query_params: params?.query_params,
    });
  },
  getCoverTeacherPageData: async (
    params?: TParams
  ): IData<{ teachers: IUser[] }> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_cover_page_data",
      query_params: params?.query_params,
    });
  },
  getDetailedFormData: async (
    params?: TParams
  ): IData<IDetailedCoverTeacherFormData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_finance_salary_detailed_cover_form_data",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  createTeacherCover: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_cover_save",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  getCoverTeacher: async (params?: TParams): IData<ICoverTeacher> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_cover_view",
      query_params: params?.query_params,
    });
  },
  getDetailedCoverTeacher: async (
    params?: TParams
  ): IData<IDetailedCoverTeacher> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_finance_salary_detailed_cover_index",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  createDetailedCoverTeacher: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_finance_salary_detailed_cover_save",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  deleteCoverTeacher: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_cover_delete",
      query_params: params?.query_params,
    });
  },
  deleteDetailedCoverTeacher: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_finance_salary_detailed_cover_delete",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  createSalaryComponent: (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_component_create",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  deleteSalaryComponent: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_component_delete",
      query_params: params?.query_params,
    });
  },
  updateSalaryMain: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_main_update",
      body: params?.body,
      query_params: params?.query_params,
    });
  },
  giveSalary: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_give",
      query_params: params?.query_params,
    });
  },
  getSalaryPageData: async (params?: TParams): IData<ISalaryPageData> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_salary_component_page_data",
      query_params: params?.query_params,
    });
  },
  getCoverTeacherSettings: async (
    params?: TParams
  ): IData<ICoverTeacherSettings> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_finance_salary_detailed_cover_config_page_data",
      query_params: params?.query_params,
    });
  },
  saveDetailedConfig: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_v1_finance_salary_detailed_cover_config_save",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  coverTeacherChangeDescription: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_component_change_description",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  giveAllSalary: async (params?: TParams) => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_give_by_ids",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  giveSalaryLastMonths: async (
    params?: TParams,
  ): IData<IPreviousMonthSalaryData[]> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_salary_last_months",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
};
