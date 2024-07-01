import { EGroupType, IGroup } from "types";

export const identifyTypeWithNextMonth = ({
  group,
}: {
  group: IGroup | undefined;
}) => {
  if (group) {
    if (!!group.free_place) {
      return EGroupType.NOTFULL;
    } else {
      if (+group.groupType.max_count === +group.payment_count) {
        return EGroupType.FULLPAID;
      } else return EGroupType.FULL;
    }
  } else return EGroupType.NOGROUP;
};
