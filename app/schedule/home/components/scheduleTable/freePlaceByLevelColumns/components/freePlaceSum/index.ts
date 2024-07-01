import { IGroup } from "types";
import Router from "next/router";

export const freePlaceSumCalc = ({
  groups,
}: {
  groups: IGroup[] | undefined;
}) => {
  return groups?.reduce((acc, cur) => {
    return acc + cur?.custom_free_place;
  }, 0);
};
