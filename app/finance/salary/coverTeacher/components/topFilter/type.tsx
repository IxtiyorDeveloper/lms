import {
  ICoverTeacherSettings,
  IDetailedCoverTeacher,
} from "types/finance/salary";
import { IRestructured } from "../calendarFilter/content/type";
import { RestructuredObject } from "../calendarFilter/functions";
import { IAssignment } from "types";
import { OutgoingRestructuredObject } from "../outgoing/functions";

export interface ITopFilter {
  data: IDetailedCoverTeacher | undefined;
  settings: ICoverTeacherSettings | undefined;
  restructured: {
    calendarRestructured: IRestructured[];
    incomingRestructured: {
      user_id?: number | undefined;
      covers_for_teacher: RestructuredObject[];
      receiver: IAssignment;
    }[];
    outgoingRestructured: OutgoingRestructuredObject[];
  };
}
