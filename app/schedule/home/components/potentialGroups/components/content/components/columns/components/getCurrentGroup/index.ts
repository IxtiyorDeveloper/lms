import { ITimedPotentialGroups } from "types";
import { ITimes } from "types/times";

export const getCurrentGroup = ({
  time,
  related_groups,
  groupType,
  record,
  day_id,
}: {
  time: ITimes;
  related_groups: ITimedPotentialGroups[];
  groupType: any;
  record: any;
  day_id?: string;
}) => {
  const id = time?.id;

  const group = related_groups?.find(
    (f) => f.lesson_time_id?.toString() == id?.toString(),
  )?.related_groups?.[record];

  const grType = groupType?.find(
    (g: { value: string | undefined }) => g.value == group?.group_type_id,
  );
  return {
    grType,
    group,
  };
};
