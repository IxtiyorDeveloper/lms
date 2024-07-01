import axios from "../../index";
import {
  IDocumentsCategory,
  ICompanyFile,
  IData,
  IFetchList,
  TParams,
} from "types";
import { PROJECT_LMS } from "../../../constants";
export default {
  getAll: (params?: TParams): IData<IFetchList<ICompanyFile>> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_index",
      ...params,
    }),
  categories: (params?: TParams): IData<IFetchList<IDocumentsCategory>> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_category",
      query_params: params?.query_params,
      body: params?.body,
    }),
  getOne: (params?: TParams): IData<ICompanyFile> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_view",
      query_params: {
        id: params?.id,
      },
    }),
  delete: (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_delete",
      query_params: params?.query_params,
      body: params?.body,
    }),
  update: (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_update",
      query_params: {
        id: params?.id,
      },
      body: params,
    }),
  create: (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_create",
      body: params,
    }),
  addCategory: (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_category_create",
      body: params?.body,
      query_params: params?.query_params,
    }),
  updateDocumentCategory: (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_category_update",
      body: params?.body,
      query_params: params?.query_params,
    }),
  deleteCategory: (params?: TParams): IData<Boolean> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_company_file_category_delete",
      body: params?.body,
      query_params: params?.query_params,
    }),
};
