import { IOption } from "components/common/select/type";

export const getNextLevel = ({
  id,
  flatLevels,
}: {
  id: any;
  flatLevels?: IOption[];
}) => {
  return flatLevels?.[flatLevels?.findIndex((e) => e.value == id) + 1]?.value;
};
