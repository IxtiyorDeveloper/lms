import { ISchedule } from "types";
import { ITimes } from "types/times";

export const freePlaceGroupFilter = ({
  collection,
  isAllDays,
  record,
  day,
  time,
}: {
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
  isAllDays: boolean;
  record: any;
  day: string | number | string[] | undefined;
  time: ITimes;
}) => {
  return collection?.groups?.filter((group) => {
    if (isAllDays) {
      return (
        group.level?.parent?.id?.toString() == record?.id?.toString() &&
        group.lesson_time_id?.toString() === time?.id.toString()
      );
    } else {
      return (
        group.level?.parent?.id?.toString() == record?.id?.toString() &&
        group.lesson_time_id?.toString() === time?.id.toString() &&
        group.lesson_day_id == day
      );
    }
  });
};
