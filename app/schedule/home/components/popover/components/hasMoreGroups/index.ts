import { IGroup } from "types";

export const hasMoreGroups = ({ groups }: { groups: IGroup[] }) => {
  if (groups) {
    return groups.length;
  } else return 0;
};