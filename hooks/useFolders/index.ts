import { TParams, TUpdateFunctions } from "types";
import { useMutation } from "@tanstack/react-query";
import folder from "api/folder";

export const getRoute = async <T extends TParams>(data: T) => {
  try {
    const res = await folder.getRoute(data);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const useFolder = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return getRoute<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
