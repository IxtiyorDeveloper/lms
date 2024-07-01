import { IGroup } from "types";
import { STATE_OPENED, STATE_OPENING } from "constants/groupStatus";

export const checkResponsible = ({
  action,
  group,
}: {
  action: "create" | "update";
  group?: IGroup;
}) => {
  if (action === "create") {
    return true;
  } else {
    if (group?.state?.toString() === STATE_OPENING?.toString()) {
      return true;
    }
    return group?.state?.toString() === STATE_OPENED?.toString();
  }
};
