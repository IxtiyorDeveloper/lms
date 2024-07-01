import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TParams, TSaveStudent, TUpdateFunctions, TWaitingList } from "types";
import groupContact from "api/groupContact";
import student from "api/student";
import { OneStudent } from "types/student";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import axios from "axios";

export const waitingListDelete = async (params?: TParams): Promise<any> => {
  try {
    const res = await student.waitingListDelete(params);
    return res.data.result as any;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const addActionStudent = async (params?: TParams): Promise<any> => {
  try {
    const res = await student.addAction(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const addPotential = async (params?: TParams): Promise<any> => {
  try {
    const res = await student.addPotential(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const removeActionStudent = async (params?: TParams): Promise<any> => {
  try {
    const res = await student.removeAction(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const removePotential = async (params?: TParams): Promise<any> => {
  try {
    const res = await student.removePotential(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const sendSms = async (params?: TParams): Promise<any> => {
  try {
    const res = await student.sendSms(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
let source = axios.CancelToken.source();
export const validateNumber = async <T extends TParams>(params?: T) => {
  try {
    source && source?.cancel("Operation canceled by the user.");
    source = axios.CancelToken.source();
    const res = await student.validateNumber(params, source.token);
    return { ...res.data.result, id: res?.config?.meta?.id };
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const addToGroupContact = async (params?: TParams): Promise<any> => {
  try {
    const res = await groupContact.addToGroupContact(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const changeCommentStudent = async (
  params?: TParams,
): Promise<TWaitingList> => {
  try {
    const res = await student.changeNoteStudent(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const resendSms = async (params?: TParams): Promise<any> => {
  try {
    const res = await student.resendSms(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getOneStudent = async (params?: TParams): Promise<OneStudent> => {
  try {
    const res = await student.getOne(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getStartDateCalculation = async (
  params?: TParams,
): Promise<OneStudent> => {
  try {
    const res = await student.getStartDateCalculation(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getSearchOneStudentArs = async (params?: TParams) => {
  try {
    const res = await student.searchOneArs(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const checkSms = async (params?: TParams): Promise<any> => {
  try {
    const res = await student.checkSms(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const saveStudent = async <T extends TSaveStudent>(
  data: T,
): Promise<void> => {
  try {
    const res = await groupContact.saveStudent(data);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};

export const admin_student_recommended_groups = async (data?: TParams) => {
  try {
    const res = await groupContact.admin_student_recommended_groups(data);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const updateStudent = async <T extends TParams>(
  data: T,
): Promise<any> => {
  try {
    await groupContact.updateStudent(data);
    return data;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getActiveStudents = async (params?: TParams) => {
  try {
    const res = await groupContact.getActiveStudents(params);
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getNewStudents = async (
  params?: TParams,
): Promise<TWaitingList> => {
  try {
    const res = await groupContact.getNewStudents(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const notAttendedToAttended = async (params?: TParams): Promise<any> => {
  try {
    const res = await groupContact.notAttendedToAttended(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const removeAttended = async (params?: TParams): Promise<any> => {
  try {
    const res = await groupContact.removeAttended(params);
    return res.data.result as any;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const getArchivedStudents = async (
  params?: TParams,
): Promise<TWaitingList> => {
  try {
    const res = await student.getArchivedStudents(params);
    return res.data.result as any;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const backToWaiting = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await student.backToWaiting(data);
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err;
  }
};
export const changePassword = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await student.changePassword(data);
  } catch (err: any) {
    throw err;
  }
};
export const changeGroupContactDateFrom = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await groupContact.changeGroupContactDateFrom(data);
  } catch (err: any) {
    throw err;
  }
};
export const updateStudentFlow = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await student.updateStudentFlow(data);
  } catch (err: any) {
    throw err;
  }
};
export const banStudent = async <T extends TParams>(data: T): Promise<void> => {
  try {
    await student.banStudent(data);
  } catch (err: any) {
    throw err;
  }
};
export const deleteStudentAvatar = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await student.deleteStudentAvatar(data);
  } catch (err: any) {
    throw err;
  }
};
/**
 * hooks
 * @param onSuccess
 * @param onError
 */
export const useSaveStudent = <T extends TSaveStudent>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return saveStudent<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useUpdateStudent = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return updateStudent<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useValidatePhoneNumber = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return validateNumber<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useNewStudentLists = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_grouped_group_contact_index, params],
    () => getNewStudents(params),
    {
      keepPreviousData: true,
    },
  );
};

export const useAdminStudentRecommendedGroups = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_recommended_groups, params],
    () => admin_student_recommended_groups(params),
    params,
  );
};

export const useGetOneStudent = (params?: TParams) => {
  return useQuery(
    [queryKeys.get_one_student, params],
    () => getOneStudent(params),
    {
      keepPreviousData: true,
      enabled: params?.type === "update" && !!params?.id,
    },
  );
};

export const useSearchOneArs = (params?: TParams) => {
  return useQuery([queryKeys.search_one_ars, params], () =>
    getSearchOneStudentArs(params),
  );
};

export const useGetOneStudentC = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (param) => getOneStudent(param),
    onSuccess,
    onError,
  });
};

export const useStartDateCalculation = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: (param) => {
      return getStartDateCalculation(param);
    },
    onSuccess,
    onError,
  });
};

export const useActiveStudents = (params?: TParams) => {
  return useQuery(
    [queryKeys.studying_student_list, params],
    () => getActiveStudents(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useDebtorsStudents = (params?: TParams) => {
  return useQuery(
    [queryKeys.debtor_student_list, params],
    () => getActiveStudents(params),
    {
      keepPreviousData: true,
    },
  );
};

export const useSendSms = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: sendSms,
    onSuccess,
    onError,
  });
};

export const useResendSms = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: resendSms,
    onSuccess,
    onError,
  });
};
export const useCheckSms = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: checkSms,
    onSuccess,
    onError,
  });
};
export const useChangeCommentStudent = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: changeCommentStudent,
    onSuccess,
    onError,
  });
};
export const useDeleteWaitingListStudent = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: waitingListDelete,
    onSuccess,
    onError,
  });
};
export const useAddActionStudent = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: addActionStudent,
    onSuccess,
    onError,
  });
};
export const useAddPotential = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: addPotential,
    onSuccess,
    onError,
  });
};
export const useRemoveActionStudent = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: removeActionStudent,
    onSuccess,
    onError,
  });
};
export const useRemovePotential = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: removePotential,
    onSuccess,
    onError,
  });
};
export const useNotAttendedToAttended = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: notAttendedToAttended,
    onSuccess,
    onError,
  });
};
export const useAddToGroupContact = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: addToGroupContact,
    onSuccess,
    onError,
  });
};
export const useArchivedStudents = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_archive_list, params],
    () => getArchivedStudents(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useBackToWaiting = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: backToWaiting,
    onSuccess,
    onError,
  });
};
export const useRemoveAttend = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: removeAttended,
    onSuccess,
    onError,
  });
};
export const useChangePassword = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess,
    onError,
  });
};

export const useChangeGroupContactDateFrom = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: changeGroupContactDateFrom,
    onSuccess,
    onError,
  });
};

export const useUpdateStudentFlow = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: updateStudentFlow,
    onSuccess,
    onError,
  });
};

export const useBanStudent = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: banStudent,
    onSuccess,
    onError,
  });
};

export const useDeleteStudentAvatar = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: deleteStudentAvatar,
    onSuccess,
    onError,
  });
};
