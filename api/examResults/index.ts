import axios from "../";
import { IData, IFetchList, TParams } from "types";
import {
  IExam,
  IExamPageData,
  IExamPermissions,
  IExamStats,
  IExamTeacherAverage,
  IExamUser,
  IMockExamDataGroupStudents,
  IMockExamDataTeacherData,
  IMockExamGroup,
  IMockExamGroupStudentListGroup,
  IMockExamStats,
  IExamStatistics,
} from "types/exam/exam";
import { OneStudent } from "types/student";
import { PROJECT_LMS } from "../../constants";

export default {
  getStats: (params: TParams): IData<IExamStats> => {
    return axios.post("/v1", {
      project: "ars",
      action: "v1_system_exam_exam_stats",
      version: "v1",
      query_params: params,
    });
  },
  admin_mock_stats: (params: TParams): IData<IMockExamStats> => {
    return axios.post("/v1", {
      project: "ars",
      action: "admin_mock_stats",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getExamUser: (params?: TParams): IData<IExamUser> => {
    return axios.post("/v1", {
      project: "ars",
      action: "admin_get_exam_user",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getExamPageData: (params: TParams): IData<IExamPageData> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_exam_page_data",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  permissions: (params: TParams): IData<IExamPermissions> =>
    axios.post("/v1", {
      project: "ars",
      action: "get_exam_permissions",
      ...params,
    }),
  getData: (params: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "ars",
      action: "v1_system_exam_exam_groups",
      version: "v1",
      query_params: params,
    });
  },
  admin_mock_groups: (params: TParams): IData<IFetchList<IMockExamGroup>> => {
    return axios.post("/v1", {
      project: "ars",
      action: "admin_mock_groups",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getGroupData: (params: TParams): IData<IExam> => {
    return axios.post("/v1", {
      project: "ars",
      action: "get_exam_group",
      version: "v1",
      query_params: params,
    });
  },
  getGroupMockExamData: (
    params: TParams
  ): IData<
    IFetchList<IMockExamDataGroupStudents> & {
      group: IMockExamGroupStudentListGroup;
    }
  > => {
    return axios.post("/v1", {
      project: "ars",
      action: "admin_mock_inside_group",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getExamByStatus: (params: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "ars",
      action: "system_exam_user_index",
      version: "v1",
      query_params: params,
    });
  },
  changeExamScore: (params: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "ars",
      action: "change_exam_score",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  getExamStudents: (params: TParams): IData<IFetchList<OneStudent>> => {
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_student_list",
      version: "v1",
      query_params: {
        expand:
          "user.student.permissionLabels,currentGroupContact.buttonActions,buttonActions,user.userProfile.avatar,group,user.userPhones,currentGroupContact.group,user.userLabels.createdBy,currentGroupContact.absDates,currentGroupContact.permissionActions",
        ...params,
        user_id: undefined,
      },
      body: {
        user_id: params?.user_id,
      },
    });
  },
  changeComment: (params: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "ars",
      action: "v1_system_exam_process_change_comment",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  changeExamProcessStatus: (params: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "ars",
      action: "admin_v1_exam_process_change_status",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  setExamAttendance: (params: TParams): IData<any> => {
    return axios.post("/v1", {
      project: "ars",
      action: "set_attendance",
      version: "v1",
      query_params: params?.query_params,
      body: params?.body,
    });
  },
  examPaper: (params?: TParams) =>
    axios.post("/v1", {
      project: "ars",
      action: "admin_exam_process_get_exam_paper",
      query_params: params?.query_params,
    }),
  getAverageTeacher: (params?: TParams): IData<IExamTeacherAverage[]> =>
    axios.post("/v1", {
      project: "ars",
      action: "admin_exam_info_get_average_teacher",
      query_params: params?.query_params,
      body: params?.body,
    }),
  getMockAverageTeacher: (params?: TParams): IData<IExamTeacherAverage[]> =>
    axios.post("/v1", {
      project: "ars",
      action: "admin_mock_exam_get_average_by_teacher",
      query_params: params?.query_params,
      body: params?.body,
    }),
  mockExamDataTeacher: (params?: TParams): IData<IMockExamDataTeacherData[]> =>
    axios.post("/v1", {
      project: "ars",
      action: "admin_mock_exam_get_average_by_teacher",
      query_params: params?.query_params,
      body: params?.body,
    }),
  getPassRateTeacher: (params?: TParams): IData<IExamTeacherAverage[]> =>
    axios.post("/v1", {
      project: "ars",
      action: "admin_exam_info_pass_rate_teacher",
      query_params: params?.query_params,
      body: params?.body,
    }),
  getMockPassRateTeacher: (params?: TParams): IData<IExamTeacherAverage[]> =>
    axios.post("/v1", {
      project: "ars",
      action: "admin_mock_exam_pass_rate_teacher",
      query_params: params?.query_params,
      body: params?.body,
    }),
  examProgress: (params?: TParams): IData<IExamStatistics> =>
    axios.post("/v1", {
      project: "ars",
      action: "admin_exam_info_exam_progress",
      query_params: params?.query_params,
      body: params?.body,
    }),
};
