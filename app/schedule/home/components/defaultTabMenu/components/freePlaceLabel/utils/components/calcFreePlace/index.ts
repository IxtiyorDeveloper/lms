import { IGroup } from "types";

export const calcFreePlace = ({
  dayFilteredGroups,
}: {
  dayFilteredGroups: IGroup[] | undefined;
}) => {
  return (
    dayFilteredGroups?.reduce((acc, cur) => {
      return acc + cur.custom_free_place;
    }, 0) || 0
  );
};
