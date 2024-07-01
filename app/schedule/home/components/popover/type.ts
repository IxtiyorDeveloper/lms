import { IGroup } from "types";
import { ICreateGroup } from "../scheduleTable/scheduleColumns";

export type IPopover = {
  isLoading: boolean;
  isPreviousData: boolean;
  group?: IGroup;
  record?: any;
  collection?: any;
  day_id?: any;
  data?: any;
  initValue?: any;
  time?: any;
  room_groups?: IGroup[] | undefined;
  l?: number;
  handleCreateGroup?({ type, room_id, time_id, isClosing }: ICreateGroup): void;
  row?: any;
  fromMultiple?: boolean;
};
