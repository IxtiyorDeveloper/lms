import { IGroup } from "types";
import Router from "next/router";

export const calculateFreePlace = ({
  group,
}: {
  group: IGroup | undefined;
}) => {
  return {
    freePlace: group?.custom_free_place ?? 0,
  };
};
