import { TStatuses } from "./general";

export interface IHoliday {
  id: number;
  date: string;
  name: string;
  type: TStatuses;
  notify_type: TStatuses;
  notify_text: string;
  delivery_statuses: TStatuses[];
  dates:
    | {
        day: string;
        from_time: string;
        to_time: string;
        notify_type: 100 | 200;
      }[];
}
