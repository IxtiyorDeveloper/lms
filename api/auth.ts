import axios from ".";
import { IData, IUserMe } from "../types";
import { PROJECT_LMS } from "../constants";

export default {
  login: (login: string, password: string) =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_auth_login",
      query_params: {
        expand:
          "rbacAssignment.rbacRole.permissionList,userProfile.avatar.children,userPhones,defaultBranches",
      },
      body: { login, password },
    }),
  getMe: (): IData<IUserMe> =>
    axios.post("/v1", {
      project: PROJECT_LMS,
      action: "admin_user_me",
      query_params: {
        expand:
          "rbacAssignment.rbacRole.permissionList,rbacAssignment.rbacRole.documents.fileStorageItem,userProfile.avatar.children,permissions_menu,permissions,default_route,operator,userPhones,defaultBranches",
      },
    }),
};
