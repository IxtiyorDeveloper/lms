import { TParams, TUpdateFunctions } from "types";
import { useMutation } from "@tanstack/react-query";
import ielts from "api/ielts";
export const createTicketUrl = async <T extends TParams>(data: T) => {
  try {
    return ielts.createTicketUrl(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param params
 */

export const useCreateTicketUrl = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createTicketUrl<T>(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
