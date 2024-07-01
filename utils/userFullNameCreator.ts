import { UserLabelTest } from "types/userLabel";
import { IUser } from "../types";

export const userFullNameCreator = (user?: UserLabelTest["createdBy"]) => {
  if (user)
    return `${user?.userProfile?.firstname} ${user?.userProfile?.lastname}`;
  else return null;
};
