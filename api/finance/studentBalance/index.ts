import axios from "../../";
import { IData, TParams, TWaitingList } from "types";
import {
  IStockBarcodeCheck,
  IStudentBalanceDashboard,
  IStudentBalanceDashboardByCondition,
  IStudentBalanceTransactionsList,
  IStudentBalanceWithdraw,
  IStudentBalanceWithdrawCheck,
} from "types/finance/studentBalance";
import { PROJECT_LMS } from "../../../constants";

export default {
  getAll: (params?: TParams): IData<TWaitingList> => {
    const { page, pageSize, ...args }: any = params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_list",
      query_params: {
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
        expand:
          "dividedBalance,user.userProfile.avatar.children,course,courseType,branch,user.userPhones,level.parent,preferTimes,preferDays,actualPayment," +
          "currentGroupContact.group.groupMentors.user," +
          "currentGroupContact.group.lessonTime," +
          "currentGroupContact.group.lessonDay," +
          "currentGroupContact.group.level.parent," +
          "currentGroupContact.group.room.branch," +
          "currentGroupContact.group.groupType,",
      },
    });
  },
  dashboard: (params?: TParams): IData<IStudentBalanceDashboard> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_dashboard",
      query_params: params?.query_params,
      body: params?.body,
    }),
  byCondition: (
    params?: TParams,
  ): IData<IStudentBalanceDashboardByCondition[]> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_statistics_by_condition",
      query_params: params?.query_params,
      body: params?.body,
    }),
  byTransaction: (params?: TParams): IData<any> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_statistics_by_transaction",
      query_params: params?.query_params,
      body: params?.body,
    }),
  returnMoney: (params?: TParams): IData<IStudentBalanceDashboard> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_return_money",
      ...params,
    }),
  studentBalanceWithDrawConfirmation: (
    params?: TParams,
  ): IData<IStudentBalanceWithdraw> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_withdraw_confirmation",
      query_params: params?.query_params,
      body: params?.body,
    }),
  financeStudentBalanceTransactions: (
    params?: TParams,
  ): IData<IStudentBalanceTransactionsList> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_transactions",
      query_params: {
        ...params?.query_params,
        expand:
          "user.student.lessonCount,user.userPhones,user.userProfile.avatar,group.teacher.user.userProfile,group.groupType,group.lessonTime,group.lessonDay,group.support.user.userProfile,group.room,group.level.parent,group.groupMentors.user",
      },
      body: params?.body,
    }),
  studentBalanceWithDrawConfirmationCheck: (
    params?: TParams,
  ): IData<IStudentBalanceWithdrawCheck> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_confirm_withdraw",
      query_params: params?.query_params,
      body: params?.body,
    }),
  admin_finance_student_balance_balance_spent_confirmation: (
    params?: TParams,
  ): IData<{
    phone_number: string;
    is_sent: boolean;
    expires_at: string;
  }> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_balance_spent_confirmation",
      query_params: params?.query_params,
      body: params?.body,
    }),
  admin_finance_student_balance_confirm_balance_spent: (
    params?: TParams,
  ): IData<{
    phone_number: string;
    is_confirmed: boolean;
    confirmation_id: number;
  }> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_finance_student_balance_confirm_balance_spent",
      query_params: params?.query_params,
      body: params?.body,
    }),
  admin_product_get_by_barcode: (params?: TParams): IData<IStockBarcodeCheck> =>
    axios.post("/v1", {
      project: "stock",
      action: "admin_product_get_by_barcode",
      query_params: params?.query_params,
      body: params?.body,
    }),
};
