import { IUserMe } from "types";

export type TUser = {
  user: IUserMe | null;
  isLoading: boolean;
  logOut: boolean;
};
