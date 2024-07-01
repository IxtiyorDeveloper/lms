import { IGroup, IRoom } from "types";
import { ITeacher } from "types/teacher";
import { filterGroups } from "./filterFreePlace";
import Router from "next/router";
import { filterFreePlace } from "../../../../utils/calculateFreePlace";
import { calcFreePlace } from "./components/calcFreePlace";

export const calculateCapacity = ({
  collection,
  day_id,
}: {
  collection: {
    groups: IGroup[] | undefined;
    rooms: IRoom[] | undefined;
    teachers: ITeacher[] | undefined;
  };
  day_id: string;
}) => {
  const groupStatus = Router.query?.groupStatus?.toString();
  const groupType = Router.query?.groupType;

  const subLevel = Router.query?.subLevel;

  const exclude_new_opening_group =
    Router.query?.exclude_new_opening_group?.toString();

  const exclude_new_opened_group =
    Router.query?.exclude_new_opened_group?.toString();

  const exclude_closing_group = Router.query?.exclude_closing_group?.toString();

  const filteredGroups = filterGroups({
    collection,
    exclude_closing_group,
    exclude_new_opened_group,
    exclude_new_opening_group,
    groupStatus,
    groupType,
    subLevel,
  });

  const dayFilteredGroups = filterFreePlace({ filteredGroups, day: day_id });

  const sumFreePlace = calcFreePlace({
    dayFilteredGroups,
  });

  const totalPlace =
    dayFilteredGroups?.reduce((acc, cur) => {
      return acc + +(cur.groupType?.max_count || 0);
    }, 0) || 0;

  return {
    sumFreePlace,
    totalPlace,
    filled: totalPlace - sumFreePlace,
    percentage:
      Number(((totalPlace - sumFreePlace) / totalPlace).toFixed(2)) * 100,
  };
};
