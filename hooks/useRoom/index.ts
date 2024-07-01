import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import room from "api/company/room";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getAllRoom = async (params?: TParams) => {
  try {
    const res = await room.getAll(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getOneRoom = async (params?: TParams) => {
  try {
    const res = await room.getOne(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const deleteRoom = async (params?: TParams) => {
  try {
    const res = await room.delete(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const changeRoomOrder = async (params?: TParams) => {
  try {
    const res = await room.changeOrder(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const saveRoom = async (params?: TParams) => {
  try {
    const res = await room.save(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const updateRoom = async (params?: TParams) => {
  try {
    const res = await room.update(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const useAllRooms = (params?: TParams) => {
  return useQuery([queryKeys.rooms_list, params], () => getAllRoom(params), {
    keepPreviousData: true,
    enabled: !params?.isLoading,
    staleTime: 60000,
  });
};
export const useOneRoom = (params?: TParams) => {
  return useQuery([queryKeys.room_list, params], () => getOneRoom(params), {
    enabled: !!params?.id,
  });
};
export const useDeleteRoom = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return deleteRoom(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useChangeRoomOrder = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return changeRoomOrder(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useSaveRoom = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveRoom(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
export const useUpdateRoom = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateRoom(data);
    },
    {
      onSuccess,
      onError,
    }
  );
};
