import { TParams, TUpdateFunctions } from "types";
import { useMutation, } from "@tanstack/react-query";
import auth from "api/auth";

export const getMe = async () => {
  try {
    const res = await auth.getMe();
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const useGetMe = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    () => {
      return getMe();
    },
    {
      onSuccess,
      onError,
    }
  );
};
