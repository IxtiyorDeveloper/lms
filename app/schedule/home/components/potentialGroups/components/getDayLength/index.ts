import { IPotentialGroup } from "types";

export const getDayLength = ({
  potentialGroups,
  day_id,
}: {
  potentialGroups: IPotentialGroup[] | undefined;
  day_id?: string;
}) => {
  if (potentialGroups) {
    return potentialGroups?.filter((p) => p.lesson_day_id == day_id)?.length;
  } else return 0;
};
