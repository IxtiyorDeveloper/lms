import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TParams, TUpdateFunctions } from "types";
import studentMove from "api/studentMove";
import { queryKeys } from "constants/queryKeys";

export const saveMove = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentMove.save(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const deleteStoppingStudent = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentMove.deleteStoppingStudent(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const getMoveValidate = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentMove.validate(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const saveContinue = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentMove.continuePerform(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const useMoveValidate = (params?: TParams) => {
  return useQuery(
    [queryKeys.move_validate, params],
    () => getMoveValidate(params),
    {
      enabled:
        !!params?.move &&
        !!params?.group_id &&
        !!params?.contact_id &&
        !!params?.date_from &&
        !!params?.leaving_category_id &&
        !!params?.reason &&
        !!params?.move,

      keepPreviousData: false,
    }
  );
};
export const useSaveMove = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: saveMove,
    onSuccess,
    onError,
  });
};
export const useSaveContinue = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: saveContinue,
    onSuccess,
    onError,
  });
};
export const useDeleteStoppingStudent = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: deleteStoppingStudent,
    onSuccess,
    onError,
  });
};
