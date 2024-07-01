import { IGroup } from "types";
import { ICreateGroup } from "../../../scheduleTable/scheduleColumns";

export type IPopover = {
  isLoading: boolean;
  isPreviousData: boolean;
  group?: IGroup;
  handleCreateGroup?({ type, room_id, time_id, isClosing }: ICreateGroup): void;
  row?: any;
  room_groups: IGroup[] | undefined;
  fromMultiple: boolean | undefined;
};
