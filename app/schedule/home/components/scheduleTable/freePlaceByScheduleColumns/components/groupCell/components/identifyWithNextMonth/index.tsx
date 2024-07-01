import { EGroupType, IGroup } from "types";
import Router from "next/router";

export const identifyTypeWithNextMonth = ({
  group,
}: {
  group: IGroup | undefined;
}) => {
  if (group) {
    if (!!group?.custom_free_place) {
      return EGroupType.NOTFULL;
    } else {
      if (+group.groupType.max_count === +group.payment_count) {
        return EGroupType.FULLPAID;
      } else return EGroupType.FULL;
    }
  } else return EGroupType.NOGROUP;
};
