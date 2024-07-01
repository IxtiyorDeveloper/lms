import { IGroup } from "types";

export const freePlaceSumCalc = ({
  groups,
}: {
  groups: IGroup[] | undefined;
}) => {
  return groups?.reduce((acc, cur) => {
    return acc + cur?.free_place;
  }, 0);
};
