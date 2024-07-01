import axios from ".";
import { IData, TParams } from "../types";
import { PROJECT_LMS } from "../constants";

export default {
  uploadImage: (file: any) =>
    axios.post("/upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  anythingUpload: (file: any) =>
    axios.post("/upload-file", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  generateFile: (file: any) => axios.post("/generate", file),
  deleteFile: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
        project: params?.project || PROJECT_LMS,
        version: params?.version,
        action: params?.action || "admin_file_delete",
      query_params: params?.query_params,
      body: params?.body,
    }),
  deleteTaskFile: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: params?.project || "task",
      version: params?.version || "v2",
      action: params?.action || "upload_delete",
      query_params: params?.query_params,
      body: params?.body,
    }),
  deleteHRFile: (params?: TParams): IData<boolean> =>
    axios.post("/v1", {
      project: "hr-v2",
      action: "admin_v1_file_upload_file_delete",
      query_params: params?.query_params,
      body: params?.body,
    }),
};
