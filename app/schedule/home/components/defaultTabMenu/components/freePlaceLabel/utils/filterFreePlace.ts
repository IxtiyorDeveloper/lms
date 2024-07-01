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
  exclude_new_opening_group,
  exclude_new_opened_group,
  exclude_closing_group,
  subLevel,
}: {
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
  groupStatus: string | undefined;
  groupType: string | string[] | undefined;
  exclude_new_opening_group: string | undefined;
  exclude_new_opened_group: string | undefined;
  exclude_closing_group: string | undefined;
  subLevel: string | string[] | undefined;
}) => {
  if (collection?.groups)
    return collection.groups.filter((group) => {
      // filter by groupStatus
      if (groupStatus) {
        if (
          groupStatus == STATE_OPENING.toString() &&
          ![STATE_OPENING.toString(), STATE_OPENED.toString()].includes(
            group.state?.toString(),
          )
        ) {
          return false;
        }
        if (
          groupStatus == STATE_OPENED.toString() &&
          group.state?.toString() !== STATE_RUNNING.toString()
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
        if (group.state?.toString() === STATE_OPENED.toString()) {
          return false;
        }
      }
      // filter by exclude closing group
      if (exclude_closing_group) {
        if (group.state?.toString() === STATE_CLOSING.toString()) {
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

      return true;
    });
};
