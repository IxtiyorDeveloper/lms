import { TParams, TUpdateFunctions } from "types";
import { useMutation } from "@tanstack/react-query";
import recommendation from "api/recommendation";

export const updatePreference = async (data: TParams) => {
  try {
    await recommendation.updatePreference(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useUpdatePreference = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updatePreference(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
