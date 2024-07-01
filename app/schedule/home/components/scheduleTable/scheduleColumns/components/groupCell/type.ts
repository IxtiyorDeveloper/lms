import { EGroupType, ISchedule } from "types";
import { ITimes } from "types/times";

export interface IGroupCell {
  record: any;
  time: ITimes;
  data: ISchedule | undefined;
  initValue: number | string;
  day_id?: string;
  fromMultiple?: boolean;
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
}
export interface ICreateGroup {
  type: EGroupType;
  room_id?: string;
  time_id?: string;
  branch_id?: string;
  isClosing?: boolean;
}
