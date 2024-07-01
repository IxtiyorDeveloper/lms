import { IGroup, ISchedule } from "types";
import { filterGroups } from "../scheduleTable/filterGroups";
import Router, { NextRouter } from "next/router";

export const calculateFreePlace = ({
  collection,
  router,
  day_id,
}: {
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
  router: NextRouter;
  day_id: string;
}) => {
  const groupStatus = router.query?.groupStatus?.toString();
  const groupType = router.query?.groupType;

  const subLevel = router.query?.subLevel;

  const exclude_new_opening_group =
    router.query?.exclude_new_opening_group?.toString();

  const exclude_new_opened_group =
    router.query?.exclude_new_opened_group?.toString();

  const exclude_closing_group = router.query?.exclude_closing_group?.toString();

  const freePlace = router.query?.freePlace?.toString();

  const freePlaceCalculation =
    router.query?.freePlaceCalculation?.toString() || "0";

  const filteredGroups = filterGroups({
    collection,
    freePlace,
    freePlaceCalculation,
    groupStatus,
    groupType,
    subLevel,
    exclude_new_opening_group,
    exclude_new_opened_group,
    exclude_closing_group,
  });

  const dayFilteredGroups = filterFreePlace({ filteredGroups, day: day_id });
  return (
    dayFilteredGroups?.reduce((acc, cur) => {
      return acc + cur.custom_free_place;
    }, 0) || 0
  );
};

export const filterFreePlace = ({
  filteredGroups,
  day,
}: {
  filteredGroups: IGroup[] | undefined;
  day: string;
}) => {
  if (day == "all") {
    return filteredGroups;
  } else {
    return filteredGroups?.filter((group) => group.lesson_day_id == day);
  }
};
