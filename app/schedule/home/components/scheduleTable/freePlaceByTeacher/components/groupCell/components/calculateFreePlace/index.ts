import { IGroup } from "types";
import Router from "next/router";

export const calculateFreePlace = ({
  group,
}: {
  group: IGroup | undefined;
}) => {
  return { freePlace: group?.free_place };
};
