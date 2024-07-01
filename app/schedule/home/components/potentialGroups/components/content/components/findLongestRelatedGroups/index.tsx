import { ITimedPotentialGroups } from "types";

export const findLongestRelatedGroups = ({
  data,
}: {
  data: ITimedPotentialGroups[];
}) => {
  let maxLength = 0;

  if (data) {
    data.forEach((item) => {
      const length = item.related_groups.length;
      if (length > maxLength) {
        maxLength = length;
      }
    });

    return Array.from({ length: maxLength }, (_, i) => i);
  } else return [];
};
