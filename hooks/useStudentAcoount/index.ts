import { TParams, TUpdateFunctions } from "types";
import studentAccount from "api/studentAccount";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICallHistoryStudent, IPaymentList } from "types/paymentList";
import { SmsList } from "types/sms";
import { IContacts } from "types/contact";
import { LifeCycle } from "types/lifeCycle";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getStudentPaymentList = async (
  params?: TParams,
): Promise<IPaymentList[]> => {
  try {
    const res = await studentAccount.getStudentPayment(params);
    return res.data.result as any;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentCallHistory = async (
  params?: TParams,
): Promise<ICallHistoryStudent[]> => {
  try {
    const res = await studentAccount.getStudentCallHistory(params);
    return res.data.result as any;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentSms = async (params?: TParams): Promise<SmsList> => {
  try {
    const res = await studentAccount.getStudentSms(params);
    return res.data.result as any;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentOrder = async (params?: TParams): Promise<SmsList> => {
  try {
    const res = await studentAccount.getStudentOrder(params);
    return res.data.result as any;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentSearchOne = async (params?: TParams) => {
  try {
    const res = await studentAccount.getStudentSearchOne(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentProgress = async (params?: TParams) => {
  try {
    const res = await studentAccount.getStudentProgress(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentSkill = async (params?: TParams) => {
  try {
    const res = await studentAccount.getStudentSkill(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentExam = async (params?: TParams) => {
  try {
    const res = await studentAccount.getStudentExam(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentEvent = async (params?: TParams) => {
  try {
    const res = await studentAccount.getStudentEvent(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentWordsCount = async (params?: TParams) => {
  try {
    const res = await studentAccount.getStudentWordsCount(params);
    return res.data.result;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentGroup = async (
  params?: TParams,
): Promise<IContacts[]> => {
  try {
    const res = await studentAccount.getStudentGroup(params);
    return res.data.result as any;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentLifeCycle = async (
  params?: TParams,
): Promise<LifeCycle[]> => {
  try {
    const res = await studentAccount.getStudentLifeCycle(params);
    return res.data.result as any;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const blockStudent = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentAccount.blockAccount(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
export const unblockStudent = async (params?: TParams): Promise<any> => {
  try {
    const res = await studentAccount.unblockAccount(params);
    return res.data.result as any;
  } catch (err: any) {
    throw err;
  }
};
/**@
 * hooks
 */

export const useStudentPaymentList = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_payment, params],
    () => getStudentPaymentList(params),
    {
      enabled: !!params?.user_id,
      keepPreviousData: false,
    },
  );
};
export const useStudentCallHistory = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_call, params],
    () => getStudentCallHistory(params),
    {
      enabled: !!params?.id && !!params?.year && !!params?.month && params?.enabled,
      keepPreviousData: false,
    },
  );
};
export const useStudentSkill = (params?: TParams) => {
  return useQuery([queryKeys.admin_student_payment, params], () =>
    getStudentSkill(params),
  );
};
export const useStudentExam = (params?: TParams) => {
  return useQuery(
    [queryKeys.system_student_profile_exam, params],
    () => getStudentExam(params),
    {
      keepPreviousData: false,
    },
  );
};

export const useStudentSms = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_sms, params],
    () => getStudentSms(params),
    {
      enabled: !!params?.user_id,
      keepPreviousData: false,
    },
  );
};
export const useStudentWordsCount = (params?: TParams) => {
  return useQuery(
    [queryKeys.system_student_profile_topic_words_count, params],
    () => getStudentWordsCount(params),
  );
};
export const useStudentSearchOne = (params?: TParams) => {
  return useQuery(
    [queryKeys.student_search_one, params],
    () => getStudentSearchOne(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useStudentEvents = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_event_index, params],
    () => getStudentEvent(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useStudentOrder = (params?: TParams) => {
  return useQuery(
    [queryKeys.student_order, params],
    () => getStudentOrder(params),
    {
      keepPreviousData: true,
    },
  );
};
export const useStudentProgress = (params?: TParams) => {
  return useQuery(
    [queryKeys.student_progress, params],
    () => getStudentProgress(params),
    {
      keepPreviousData: true,
    },
  );
};

export const useStudentGroup = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_group, params],
    () => getStudentGroup(params),
    {
      enabled: !!params?.user_id,
      keepPreviousData: false,
    },
  );
};

export const useStudentLifeCycle = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_student_life_cycle, params],
    () => getStudentLifeCycle(params),
    {
      enabled: !!params?.user_id,
      keepPreviousData: false,
    },
  );
};

export const useBlockStudent = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: blockStudent,
    onSuccess,
    onError,
  });
};

export const useUnblockStudent = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: unblockStudent,
    onSuccess,
    onError,
  });
};
