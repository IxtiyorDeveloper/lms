import { TParams, TUpdateFunctions } from "types";
import { useMutation } from "@tanstack/react-query";
import complaint from "api/complaint";

export const createComplaint = async (params?: TParams) => {
  try {
    const res = await complaint.createComplaint(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useCreateComplaint = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createComplaint(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
