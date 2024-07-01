import { TParams, TUpdateFunctions } from "types";
import { useMutation } from "@tanstack/react-query";
import user from "api/user";
export const changeUserPassword = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await user.changePassword(data);
  } catch (err: any) {
    throw err;
  }
};

export const useChangeUserPassword = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeUserPassword<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
