import { TAssignment } from "types";

export const separateToGroupForms = ({
  detailedData,
}: {
  detailedData: TAssignment | undefined;
}) => {
  const groupForms = detailedData?.details?.groupForms;

  return Object.entries(groupForms ?? {}).map(([key, value], index) => {
    return {
      group_form: key,
      groups: value?.groups,
      range: value?.range,
    };
  });
};
