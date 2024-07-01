import { TAssignment } from "types";

export const generateUserProfile = ({
  index,
  props,
  record,
}: {
  index: number;
  props: any;
  record: TAssignment;
}) => {
  return {
    ...props,
    index,
    value: record?.receiver?.userProfile,
  };
};
