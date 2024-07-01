import { ITimes } from "types/times";
import { IGroup, ISchedule } from "types";

export interface IGroupCell {
  record: any;
  time: ITimes;
  data: ISchedule | undefined;
  initValue: number | string;
  day_id?: string;
  room_groups: IGroup[] | undefined;
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
}
