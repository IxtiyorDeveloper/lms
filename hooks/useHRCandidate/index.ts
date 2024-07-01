import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { TParams, TUpdateFunctions } from "types";
import { useMutation, useQuery } from "@tanstack/react-query";
import candidate from "api/hr/candidate";
import _ from "lodash";

export const getInitialData = async (params?: TParams) => {
  try {
    const res = await candidate.initialData(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getCandidate = async (params?: TParams) => {
  try {
    const res = await candidate.getCandidate(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const downloadMeeting = async (params?: TParams) => {
  try {
    const res = await candidate.downloadMeeting(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getMeetingDays = async (params?: TParams) => {
  try {
    const res = await candidate.getMeetingDays(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const approveInfo = async (params?: TParams) => {
  try {
    const res = await candidate.approveInfo(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const stageList = async (params?: TParams) => {
  try {
    const res = await candidate.stageList(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const lifecycle = async (params?: TParams) => {
  try {
    const res = await candidate.lifecycle(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const meetingResponsible = async (params?: TParams) => {
  try {
    const res = await candidate.meetingResponsible(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};

export const changeCommentCandidate = async <T extends TParams>(
  data: T
): Promise<void> => {
  try {
    await candidate.changeComment(data);
  } catch (err: any) {
    throw err;
  }
};
export const changeColorCandidate = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.changeColor(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const callRequestLabel = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.callRequestLabel(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const notAnswered = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.notAnswered(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const lifeCycle = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.lifeCycle(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const rejected = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.rejected(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const create = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.create(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const update = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.update(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const setMeeting = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.setMeeting(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const absentMeeting = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.absentMeeting(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const clearMeeting = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.clearMeeting(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const approve = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.approve(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const setTraningStage = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.setTraningStage(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const candidateList = async <T extends TParams>(data: T) => {
  try {
    const res = await candidate.candidateList(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useGetCandidate = (params?: TParams) => {
  return useQuery(
    [queryKeys.candidate_model_data, params],
    () => getCandidate(params),
    {
      enabled: !!params?.enabled,
    }
  );
};
export const useGetMeetingDays = (params?: TParams) => {
  return useQuery(
    [queryKeys.meeting_days, params],
    () => getMeetingDays(params),
    {
      enabled: !!params?.enabled,
    }
  );
};
export const useApproveInfo = (params?: TParams) => {
  return useQuery([queryKeys.approve_info, params], () => approveInfo(params), {
    enabled: !!params?.enabled,
  });
};
export const useGetStageList = (params?: TParams) => {
  return useQuery([queryKeys.approve_info, params], () => stageList(params), {
    enabled: !!params?.enabled,
  });
};
export const useCandidateLifecycle = (params?: TParams) => {
  return useQuery(
    [queryKeys.candidate_lifecycle, params],
    () => lifecycle(params),
    {
      enabled: !!params?.enabled,
    }
  );
};
export const useMeetingResponsible = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_v1_main_general_get_meeting_responsible, params],
    () => meetingResponsible(params),
    {
      enabled: !!params?.enabled,
    }
  );
};

export const useCandidateList = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: candidateList,
    onSuccess,
    onError,
  });
};

export const useDownloadMeeting = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: downloadMeeting,
    onSuccess,
    onError,
  });
};

export const useGetHRInitialData = (params?: TParams) => {
  return useQuery(
    [queryKeys.hr_initial_data, params],
    () => getInitialData(params),
    {
      staleTime: Infinity,
      enabled: !!params?.enabled,
    }
  );
};

export const useChangeCommentCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: changeCommentCandidate,
    onSuccess,
    onError,
  });
};
export const useChangeColorCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: changeColorCandidate,
    onSuccess,
    onError,
  });
};
export const useCallRequestCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: callRequestLabel,
    onSuccess,
    onError,
  });
};
export const useNotAnsweredCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: notAnswered,
    onSuccess,
    onError,
  });
};
export const useLifeCycleCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: lifeCycle,
    onSuccess,
    onError,
  });
};
export const useRejectedCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: rejected,
    onSuccess,
    onError,
  });
};
export const useCreateCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: create,
    onSuccess,
    onError,
  });
};
export const useUpdateCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: update,
    onSuccess,
    onError,
  });
};

export const useSetMeeting = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: setMeeting,
    onSuccess,
    onError,
  });
};
export const useAbsentMeeting = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: absentMeeting,
    onSuccess,
    onError,
  });
};
export const useClearMeeting = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation({
    mutationFn: clearMeeting,
    onSuccess,
    onError,
  });
};
export const useApproveCandidate = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: approve,
    onSuccess,
    onError,
  });
};
export const useSetTraningStage = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation({
    mutationFn: setTraningStage,
    onSuccess,
    onError,
  });
};
