import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { toast } from "react-toastify";

export const checkCanEdit = () =>
  new Promise((resolve, reject) => {
    if (funcCheckPermission([COMPONENTS_VIEWS.can_edit_rbac_role])) {
      return resolve({});
    }
    toast.error("You have not permission!");
    return reject({});
  });
