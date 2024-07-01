import { ITimes } from "types/times";
import { ISchedule } from "types";

export interface IGroupCell {
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
  time: ITimes;
  day: string;
  freePlaceSum: number | undefined;
  record: any;
  index: number;
}
