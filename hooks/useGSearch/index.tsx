import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TParams, TUpdateFunctions } from "types";
import globalSearch from "api/globalSearch";

export const getSearchResult = async (params?: TParams) => {
  try {
    const res = await globalSearch.globalSearch(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data.client_error.description);
    throw err;
  }
};

export const useGSearch = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return getSearchResult(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
