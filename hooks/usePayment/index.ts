import { TParams, TUpdateFunctions } from "types";
import payment from "api/payment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICalculation } from "types/ICalculation";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const getCalculation = async (
  params?: TParams,
): Promise<ICalculation> => {
  try {
    const res = await payment.getCalculation(params);
    return res.data.result as any;
  } catch (err: any) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const getStudentBalance = async <T extends TParams>(params?: T) => {
  try {
    const res = await payment.studentBalance(params);
    return res.data.result;
  } catch (err: any) {
    throw err;
  }
};
export const getDispersion = async (params?: TParams) => {
  try {
    const res = await payment.getDispersion(params);
    return res.data.result;
  } catch (err) {
    validationErrorHandler({ err });
    throw err;
  }
};
export const createPayment = async <T extends TParams>(
  data: T,
): Promise<any> => {
  try {
    return payment.pay(data);
  } catch (err) {
    throw err;
  }
};
export const admin_finance_stationary_give_payment = async (data: TParams) => {
  try {
    return payment.admin_finance_stationary_give(data);
  } catch (err) {
    throw err;
  }
};
export const createPaymentRequest = async <T extends TParams>(
  data: T,
): Promise<any> => {
  try {
    return payment.paymentRequest(data);
  } catch (err: any) {
    throw err;
  }
};
export const useCalculation = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_grouped_modals_calculation, params],
    () => getCalculation(params),
    {
      enabled: !!params?.id,
      keepPreviousData: false,
    },
  );
};
export const useGetDispersion = (params?: TParams) => {
  return useQuery(
    [queryKeys.admin_finance_dispersion, params],
    () => getDispersion(params),
    {
      enabled: !!params?.query_params.user_id,
      keepPreviousData: false,
    },
  );
};
export const useCreatePayment = ({ onSuccess, onError }: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return createPayment(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useAdminFinanceStationaryGivePayment = ({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, TParams>(
    (data) => {
      return admin_finance_stationary_give_payment(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};

export const useCreatePaymentRequest = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return createPaymentRequest<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
export const useStudentBalance = <T extends TParams>({
  onSuccess,
  onError,
}: TUpdateFunctions) => {
  return useMutation<any, Error, T>(
    (data) => {
      return getStudentBalance<T>(data);
    },
    {
      onSuccess,
      onError,
    },
  );
};
