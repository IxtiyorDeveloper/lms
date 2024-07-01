import { ISchedule } from "types";
import { ITimes } from "types/times";

export interface IGroupCell {
  isAllDays: boolean;
  record: any;
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
  time: ITimes;
  day: string;
  freePlaceSum: number | undefined;
  index: number;
}
