import { TParams, TUpdateFunctions } from "types";
import { useMutation } from "@tanstack/react-query";
import price from "api/price";

export const setPrice = async <T extends TParams>(data: T): Promise<void> => {
  try {
    await price.setPrice(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */
export const useSetPrice = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return setPrice<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
