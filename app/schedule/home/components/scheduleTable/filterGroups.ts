import {
  STATE_CLOSING,
  STATE_OPENED,
  STATE_OPENING,
  STATE_RUNNING,
} from "constants/groupStatus";
import { ISchedule } from "types";

export const filterGroups = ({
  collection,
  groupStatus,
  groupType,
  subLevel,
  freePlaceCalculation,
  freePlace,
  exclude_new_opening_group,
  exclude_new_opened_group,
  exclude_closing_group,
}: {
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
  groupStatus: string | undefined;
  groupType: string | string[] | undefined;
  subLevel: string | string[] | undefined;
  freePlaceCalculation: string | undefined;
  freePlace: string | undefined;
  exclude_new_opening_group: string | undefined;
  exclude_new_opened_group: string | undefined;
  exclude_closing_group: string | undefined;
}) => {
  if (collection?.groups)
    return collection.groups.filter((group) => {
      // filter by groupStatus
      if (groupStatus) {
        if (
          groupStatus == STATE_OPENING.toString() &&
          ![STATE_OPENING.toString(), STATE_OPENED.toString()].includes(
            group.state.toString(),
          )
        ) {
          return false;
        }
        if (
          groupStatus == STATE_OPENED.toString() &&
          group.state.toString() !== STATE_RUNNING.toString()
        ) {
          return false;
        }
      }
      // filter by exclude new opening group
      if (exclude_new_opening_group) {
        if (group.state?.toString() === STATE_OPENING.toString()) {
          return false;
        }
      }
      // filter by exclude new opened group
      if (exclude_new_opened_group) {
        if (group.state.toString() === STATE_OPENED.toString()) {
          return false;
        }
      }
      // filter by exclude closing group
      if (exclude_closing_group) {
        if (group.state.toString() === STATE_CLOSING.toString()) {
          return false;
        }
      }

      // filter by groupType
      if (Array.isArray(groupType)) {
        if (
          groupType &&
          !groupType?.some(
            (grt) => grt?.toString() === group.groupType.id?.toString(),
          )
        )
          return false;
      } else {
        if (
          groupType &&
          group.groupType.id?.toString() !== groupType?.toString()
        )
          return false;
      }
      // filter by groupType

      // filter by subLevel
      if (Array.isArray(subLevel)) {
        if (
          subLevel &&
          !subLevel?.some(
            (grt) => grt?.toString() === group.level?.id?.toString(),
          )
        )
          return false;
      } else {
        if (subLevel && group.level?.id?.toString() !== subLevel?.toString())
          return false;
      }

      if (freePlaceCalculation) {
        if (freePlaceCalculation == "0") {
          if (freePlace && +group.custom_free_place != parseInt(freePlace))
            return false;
        }
        if (freePlaceCalculation == "1") {
          if (freePlace && +group.custom_free_place > parseInt(freePlace))
            return false;
        }
        if (freePlaceCalculation == "2") {
          if (freePlace && +group.custom_free_place >= parseInt(freePlace))
            return false;
        }
        if (freePlaceCalculation == "3") {
          if (freePlace && +group.custom_free_place < parseInt(freePlace))
            return false;
        }
        if (freePlaceCalculation == "4") {
          if (freePlace && +group.custom_free_place <= parseInt(freePlace))
            return false;
        }
      }
      // filter by freePlace

      return true;
    });
};
