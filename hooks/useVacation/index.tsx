import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import vacation from "api/staffSettings/vacation";
import { queryKeys } from "../../constants/queryKeys";
import {
  IActiveVacationsData,
  IDepartmentsListForVacation,
  IStaffVacationsList,
  UserVacationHistoryObj,
} from "../../types/staffSettings/vacation";

export const createSlot = async <T extends TParams>(data: T): Promise<void> => {
  try {
    const res = await vacation.createSlot(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const createVacation = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    const res = await vacation.createVacation(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getVacationHistory = async <T extends TParams>(
  data: T,
): Promise<UserVacationHistoryObj> => {
  try {
    const res = await vacation.getUserDetail(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getActiveVacations = async <T extends TParams>(
  data?: T,
): Promise<IActiveVacationsData> => {
  try {
    const res = await vacation.getActiveVacations(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getVacationHistoryOneUser = async <T extends TParams>(
  data: T,
): Promise<IStaffVacationsList> => {
  try {
    const res = await vacation.getUserVacationsList(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getVacationScheduleData = async <T extends TParams>(
  data?: T,
): Promise<IDepartmentsListForVacation[]> => {
  try {
    const res = await vacation.getScheduleData(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getAssignmentInsideData = async <T extends TParams>(
  data?: T,
): Promise<any> => {
  try {
    const res = await vacation.getAssignmentView(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getSlotsByPeriod = async <T extends TParams>(
  data?: T,
): Promise<void> => {
  try {
    const res = await vacation.getSlotsByPeriod(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const updateVacation = async <T extends TParams>(
  data?: T,
): Promise<any> => {
  try {
    const res = await vacation.updateVacation(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const deleteVacation = async <T extends TParams>(
  data?: T,
): Promise<any> => {
  try {
    const res = await vacation.deleteVacation(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useGetSlotsByPeriod = (params?: TParams) => {
  return useQuery({
    queryKey: [queryKeys.get_vacation_slots, params],
    queryFn: () => getSlotsByPeriod(params),
  });
};

export const useGetUserVacationDetails = (params: TParams) => {
  return useQuery({
    queryKey: [queryKeys.get_user_vacation_details, params],
    queryFn: () => getVacationHistory(params),
  });
};

export const useGetActiveVacation = (params?: TParams) => {
  return useQuery({
    queryKey: [queryKeys.get_active_vacations, params],
    queryFn: () => getActiveVacations(params),
  });
};

export const useGetUserVacationList = (params: TParams) => {
  return useQuery({
    queryKey: [queryKeys.get_vacation_details_one, params],
    queryFn: () => getVacationHistoryOneUser(params),
    enabled: !!params?.query_params?.user_id,
  });
};

export const useGetScheduleData = (params?: TParams) => {
  return useQuery({
    queryKey: [queryKeys.get_main_schedule_data, params],
    queryFn: () => getVacationScheduleData(params),
  });
};

export const useGetAssignmentView = (params?: TParams) => {
  return useQuery({
    queryKey: [queryKeys.get_assignment_view_vacation, params],
    queryFn: () => getAssignmentInsideData(params),
    enabled: !!params?.query_params?.id,
  });
};

export const useCreateVacationSlot = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createSlot<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const useCreateVacation = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>((data) => createVacation<T>(data), {
    onSuccess,
    onError,
  });
};
export const useUpdateVacation = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>((data) => updateVacation<T>(data), {
    onSuccess,
    onError,
  });
};

export const useDeleteVacation = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>((data) => deleteVacation<T>(data), {
    onSuccess,
    onError,
  });
};
