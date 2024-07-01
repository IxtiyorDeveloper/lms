import { TParams, TUpdateFunctions } from "types";
import { useMutation } from "@tanstack/react-query";
import file from "api/file";

export const uploadImage = async (params: TParams): Promise<any> => {
  try {
    const res = await file.anythingUpload(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const deleteFile = async (params: TParams) => {
  try {
    const res = await file.deleteFile(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteTaskFile = async (params: TParams) => {
  try {
    const res = await file.deleteTaskFile(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteHRFile = async (params: TParams) => {
  try {
    const res = await file.deleteHRFile(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useUploadFile = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return uploadImage(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const anyUploadImage = async (params: TParams): Promise<any> => {
  try {
    const res = await file.anythingUpload(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};

export const useAnyUploadImage = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return anyUploadImage(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const phoneListFileGenerator = async (params: TParams): Promise<any> => {
  try {
    const res = await file.generateFile(params);
    return res.data.result as string;
  } catch (err: any) {
    throw err;
  }
};

export const usePhoneListFileGenerator = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return phoneListFileGenerator(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteFile = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return deleteFile(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteTaskFile = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return deleteTaskFile(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useDeleteHRFile = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return deleteHRFile(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
