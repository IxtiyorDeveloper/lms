import { TAssignment } from "types";

export const getData = ({
  searchText,
  data,
}: {
  searchText: string | undefined;
  data?: TAssignment[];
}) => {
  if (!searchText) {
    return data;
  }

  const filteredData = data?.filter((item) => {
    const fullName = `${(item.receiver?.userProfile?.firstname || "").toLowerCase()}${(item.receiver?.userProfile?.lastname || "").toLowerCase()}`;
    return fullName.includes(searchText.toLowerCase());
  });

  if (!filteredData) {
    return [];
  }

  return filteredData;
};
