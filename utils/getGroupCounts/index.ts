import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import { TParams } from "types";

export const getGroupCounts = ({ groupCounts }: { groupCounts: TParams }) => {
  const restructured = Object.entries(groupCounts || {}).map(
    ([key, value], index) => {
      return {
        group_form: key,
        count: value,
      };
    },
  );

  const groupCount = restructured?.find(
    (r) => r.group_form?.toString() == GROUP_FORM_GROUP?.toString(),
  )?.count;

  const indCount = restructured?.find(
    (r) => r.group_form?.toString() == GROUP_FORM_INDIVIDUAL?.toString(),
  )?.count;
  return {
    groupCount,
    indCount,
  };
};
