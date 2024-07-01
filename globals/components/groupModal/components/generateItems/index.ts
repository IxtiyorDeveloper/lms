import {
  STATE_CLOSED,
  STATE_CLOSING,
  STATE_OPENED,
  STATE_OPENING,
  STATE_RUNNING,
  STATUS_ARCHIVED,
} from "constants/groupStatus";
import { IGroup } from "types";

export const generateItems = ({
  reduxData,
  group,
  action,
}: {
  reduxData: { [p: string]: any };
  group: IGroup | undefined;
  action: any;
}) => {
  const isOptional =
    !reduxData?.group ||
    reduxData?.group?.state?.toString() === STATE_OPENING?.toString() ||
    reduxData?.group?.state?.toString() === STATE_OPENED?.toString();

  const canReason =
    group?.state?.toString() == STATE_CLOSED?.toString() ||
    group?.state?.toString() == STATE_CLOSING?.toString();

  const isDatePickerDisabled =
    (action === "update" &&
      (group?.state?.toString() == STATE_RUNNING?.toString() ||
        group?.state?.toString() == STATE_CLOSING?.toString() ||
        group?.state?.toString() == STATE_CLOSED?.toString())) ||
    (group?.status?.toString() == STATUS_ARCHIVED?.toString() &&
      group?.state?.toString() === STATE_CLOSED?.toString());

  const isDisabled =
    group?.state?.toString() === STATE_CLOSED?.toString() ||
    group?.status?.toString() === STATUS_ARCHIVED?.toString();

  return {
    isOptional,
    canReason,
    isDatePickerDisabled,
    isDisabled,
  };
};
