import { IGroup } from "types";

export const checkNoGroup = ({ groups }: { groups?: IGroup[] }) => {
  return groups?.every((gr) => gr.custom_free_place?.toString() === "0");
};
