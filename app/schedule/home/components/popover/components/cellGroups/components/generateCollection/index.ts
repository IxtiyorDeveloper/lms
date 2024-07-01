import { IGroup, ISchedule } from "types";

export const generateCollection = ({
  item,
  collection,
  room_groups,
}: {
  item: IGroup;
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
  room_groups: IGroup[] | undefined;
}) => {
  const deletedGroup = room_groups?.filter((r) => r.id !== item?.id)?.[0];
  return {
    ...collection,
    groups: collection?.groups?.filter((gr) => gr.id !== deletedGroup?.id),
  };
};
