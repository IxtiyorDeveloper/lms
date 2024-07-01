import axios from ".";
import { IData, IWithoutPromiseData, TParams } from "types";
import { IContacts } from "types/contact";
import { IGlobalSearch } from "../types/globalSearch";
import { PROJECT_LMS } from "../constants";

export default {
  globalSearch: (params?: TParams): IData<IGlobalSearch> => {
    const { page, pageSize, ...args }: any = params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_global_search",
      query_params: {
        expand:
          "stage_name,groupMentors.user.userPhones,userPhones,userProfile.avatar.children,groupMentors.user.userProfile.avatar.children,student.user.userProfile.avatar,student.user.userPhones,student.currentGroupContact.group,rbacAssignment.rbacRole",
        ...args,
        page: page || 1,
        "per-page": 100,
      },
    });
  },
  globalStudentSearch: async (
    params?: TParams,
  ): IData<IWithoutPromiseData<IContacts>> => {
    const { page, pageSize, ...args }: any = params;
    return axios.post("/v1", {
      project: PROJECT_LMS,
      action: params?.action_name || "admin_global_student_search",
      query_params: {
        expand: params?.expand,
        ...args,
        page: page || 1,
        "per-page": 100,
      },
    });
  },
};
