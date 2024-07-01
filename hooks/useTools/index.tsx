import { TParams, TUpdateFunctions } from "types";
import tools from "api/company/tools";
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "../../utils";

export const toolsChangeDate = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await tools.changeDate(data);
  } catch (err: any) {
    throw err;
  }
};
export const getWaitingListConfig = async (data?: TParams) => {
  try {
    const res = await tools.getWaitingListConfig(data);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const setMockConfig = async <T extends TParams>(
    data: T,
): Promise<void> => {
  try {
    await tools.setMockConfig(data);
  } catch (err: any) {
    throw err;
  }
};
export const getMockConfig = async (data?: TParams) => {
  try {
    const res = await tools.getMockConfig(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const setWaitingListConfig = async (data: TParams) => {
  try {
    const res = await tools.setWaitingListConfig(data);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const setRestudyConfig = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await tools.setRestudyConfig(data);
  } catch (err: any) {
    throw err;
  }
};

export const toolsChangeReferralCoins = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await tools.changeReferralCoins(data);
  } catch (err: any) {
    throw err;
  }
};
export const toolsChangeWillPayDate = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await tools.changeWillPayDate(data);
  } catch (err: any) {
    throw err;
  }
};
export const toolsChangeGroupStartDate = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await tools.changeGroupStartDate(data);
  } catch (err: any) {
    throw err;
  }
};
export const toolsDeleteGroupNotes = async <T extends TParams>(
  data: T,
): Promise<void> => {
  try {
    await tools.deleteGroupNotes(data);
  } catch (err: any) {
    throw err;
  }
};
export const getRouteParams = async <T extends TParams>(data?: T) => {
  try {
    const res = await tools.routParams(data);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const getReferralConfigPageData = async () => {
  try {
    const res = await tools.getReferralConfigPageData();
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};

export const useReferralConfigPageData = () => {
  return useQuery([queryKeys.admin_finance_referral_form_page_data], () =>
    getReferralConfigPageData(),
  );
};

export const useRouteParams = (params?: TParams) => {
  return useQuery(
    [queryKeys.route_params, params],
    () => getRouteParams(params),
    {
      keepPreviousData: true,
      enabled: !!params?.query_params && !_.isEmpty(params?.query_params),
    },
  );
};

export const useWaitingListConfig = (params?: TParams) => {
  return useQuery(
    [queryKeys.get_waiting_list_config, params],
    () => getWaitingListConfig(params),
    params,
  );
};

export const useToolsChangeDate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return toolsChangeDate<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useMockConfig = (params?: TParams) => {
  return useQuery(
      [queryKeys.admin_level_config_get_mock_config, params],
      () => getMockConfig(params),
      {
        enabled: params?.enabled,
      },
  );
};
export const useSetWaitingListConfig = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return setWaitingListConfig(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useSetRestudyConfig = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return setRestudyConfig<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useSetMockConfig = <T extends TParams>({
                                                      onSuccess,
                                                      onError,
                                                    }: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
      (data) => {
        return setMockConfig<T>(data);
      },
      {
        onSuccess,
        onError,
      },
  );
};

export const useToolsChangeReferralCoins = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return toolsChangeReferralCoins<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useToolsChangeGroupStartDate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return toolsChangeGroupStartDate<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useToolsDeleteGroupNotes = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return toolsDeleteGroupNotes<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useToolsChangeWillPayDate = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return toolsChangeWillPayDate<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
