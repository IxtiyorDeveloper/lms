import axios from "../";
import {
  IStudentStatistics,
  IFetchTeachers,
  TParams,
  IData,
  IFetchList,
  IIncomeStatistics,
  ILostItem,
  IMainCard,
  IWaitingListStatistics,
  INewStudentStatistics,
  IKpiStatistics,
  IStaffMotivationStatistics,
  IFreshmanLostPageData,
  ISMSStatisticsPageData,
  ISMSStatisticsPageDataTypeManual,
} from "types";
import { IFreshmanLost } from "types";
import { ISMSCounts, ISmsDelivery } from "types/statistics/sms";
import { ILeadStatistics } from "types/statistics/lead";
import moment from "moment";
import { PROJECT_LMS } from "../../constants";
import { ITeacherLost } from "../../types/statistics/teacherLost";
import { IStatisticsGroups } from "../../types/statistics/group";

export default {
  mainCard: (params?: TParams): IData<IMainCard> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_main_card",
      ...params,
    }),
  freshmanLost: (params?: TParams): IData<IFreshmanLost> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_freshman_lost",
      ...params,
    }),
  lost: (params?: TParams): IData<IFetchList<ILostItem>> => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_freshman_lost_lost_list",
      body: params?.body,
      query_params: {
        // expand: params?.expand,
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
      },
    });
  },
  group: (params?: TParams): IData<IStatisticsGroups> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_group",
      ...params,
    }),
  freshman: (params?: TParams): IData<IFetchList<ILostItem>> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_freshman_lost_freshman_list",
      body: params?.body,
      query_params: params?.query_params,
    }),
  freshmanLostPageData: (params?: TParams): IData<IFreshmanLostPageData> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_freshman_lost_freshman_page_data",
      ...params,
    }),
  podo: (params?: TParams): IData<IFetchList<ILostItem>> => {
    const { page, pageSize, ...args }: any = params?.query_params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_podo_index",
      query_params: {
        expand: params?.expand,
        ...args,
        page: page || 1,
        "per-page": pageSize || 20,
      },
      body: params?.body,
    });
  },
  group: (params?: TParams): IData<IStatisticsGroups> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_group",
      ...params,
    }),
  teacherLost: (params?: TParams): IData<IFetchTeachers<ITeacherLost>> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_teacher_lost",
      ...params,
    }),
  student: (params?: TParams): IData<IStudentStatistics> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_student",
      ...params,
    }),
  newStudent: (params?: TParams): IData<INewStudentStatistics> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_new_student",
      ...params,
    }),
  waitingList: (params?: TParams): IData<IWaitingListStatistics> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_waiting_list",
      ...params,
    }),
  lead: (params?: TParams): IData<ILeadStatistics> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_lead",
      ...params,
    }),
  income: (params?: TParams): IData<IIncomeStatistics> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_income",
      ...params,
    }),
  smsPageData: (params?: TParams): IData<ISMSStatisticsPageData[]> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_sms_statistics_page_data",
      ...params,
    }),
  smsCounts: (params?: TParams): IData<ISMSCounts> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_sms",
      ...params,
    }),
  smsList: (params?: TParams): IData<ISmsDelivery> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_sms_delivery",
      ...params,
    }),
  kpi: (params?: TParams): IData<IKpiStatistics> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_kpi",
      query_params: {
        ...params,
        year: params?.year || moment().format("YYYY"),
        month: params?.month || moment().format("MM"),
        // role_id: null,
      },
    }),
  staffMotivation: (params?: TParams): IData<IStaffMotivationStatistics> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_statistics_dashboard_statistics_staff_motivation",
      query_params: {
        ...params,
        year: params?.year || moment().year(),
        month: params?.month || moment().month(),
        // role_id: null,
      },
    }),
};
