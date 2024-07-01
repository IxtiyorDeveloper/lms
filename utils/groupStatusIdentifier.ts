import {
  groupStatusWithArchive,
  groupStatusWithState,
  STATE_OPENED,
  STATE_OPENING,
  STATUS_ACTIVE,
  STATUS_ARCHIVED,
} from "../constants/groupStatus";

export const groupStatusIdentifier = ({ group }: { group?: any }) => {
  if (group?.status?.toString() === STATUS_ACTIVE?.toString()) {
    return groupStatusWithState?.[
      group?.state as unknown as keyof typeof groupStatusWithState
    ];
  } else {
    if (group?.status?.toString() === STATUS_ARCHIVED?.toString()) {
      return groupStatusWithArchive?.[STATUS_ARCHIVED];
    }
  }
};

export const checkGroupStatusOpeningOrOpened = ({ group }: { group?: any }) => {
  if (group?.status?.toString() === STATUS_ACTIVE?.toString()) {
    return group?.state == STATE_OPENING || group?.state == STATE_OPENED;
  } else {
    if (group?.status?.toString() === STATUS_ARCHIVED?.toString()) {
      return false;
    }
  }
};
