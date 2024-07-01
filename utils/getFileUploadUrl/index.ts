import env from "../env";
import { EFileDirection } from "../../types/uploadFile";

export const getFileUploadUrl = ({ url }: { url: string }) => {
  let result = env.anythingUpload;
  if (url === EFileDirection.hrFile) {
    result = env.fileUploadHR;
  }
  if (url === EFileDirection.hrAvatar) {
    result = env.fileUploadAvatarHR;
  }
  if (url === EFileDirection.task) {
    result = env.fileUploadTask;
  }
  if (url === EFileDirection.stock) {
    result = env.stockUpload;
  }
  return result;
};
export const getFileUploadToken = ({ url }: { url: string }) => {
  let result = env.fileUploadToken;
  if (url === EFileDirection.task) {
    result = env.task_upload_token;
  }
  return result;
};

export const getFileKey = ({ url }: { url: string }) => {
  let result = "file";
  if (url === EFileDirection.task) {
    result = "files";
  }
  return result;
};
