import { IGroup, TParams } from "../types";
import { groupStatusIdentifier } from "./groupStatusIdentifier";

export const checkToUndefined = ({
  data,
  group,
  canStarDate = false,
  is_responsible,
}: {
  data: TParams;
  group?: IGroup;
  canStarDate?: boolean;
  is_responsible?: boolean;
}) => {
  let tempObj = {};

  const canHaveStartDate =
    canStarDate ||
    groupStatusIdentifier({ group }) === "Opening" ||
    groupStatusIdentifier({ group }) === "Opened";

  const { start_date, ...rest } = data;

  const filteredGroups = canHaveStartDate ? data : { ...(rest || {}) };

  const { responsible_id, ...withoutResponsible } = filteredGroups;

  const afterResponsible = is_responsible ? filteredGroups : withoutResponsible;

  for (const [key, value] of Object.entries(afterResponsible)) {
    if (!!value) {
      tempObj = {
        ...tempObj,
        [key]: value,
      };
    }
  }
  return tempObj;
};
