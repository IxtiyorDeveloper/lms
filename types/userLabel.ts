import { IUser } from "./user";
import { TStatuses } from "./general";

export interface UserLabel {
  id: number;
  type: TStatuses;
  datetime: string;
  note: null;
  color: string;
  user: IUser;
  createdBy?: {
    userProfile: {
      firstname: string;
      lastname: string;
    };
  };
  left_units_count?: number;
}

export interface UserLabelTest {
  createdBy?: {
    userProfile: {
      firstname: string;
      lastname: string;
    };
  };
}
