import React from "react";
import { FullNameWrapper } from "./style";
import { TAssignment } from "types";
import { getGroupCounts } from "utils/getGroupCounts";

const GroupCounts = ({ record }: { record: TAssignment }) => {
  const { groupCount, indCount } = getGroupCounts({
    groupCounts: record?.groupCounts,
  });

  const value = record?.receiver?.userProfile;

  const name = value
    ? value?.fullName ?? value?.firstname + " " + value?.lastname
    : "-";

  return (
    <FullNameWrapper>
      <p>{name}</p>
      <div className="btr">
        {!!groupCount && (
          <div className="count">
            <p>Gr:</p>
            <p>{groupCount}</p>
          </div>
        )}
        {!!indCount && (
          <div className="count">
            <p>Ind:</p>
            <p>{indCount}</p>
          </div>
        )}
      </div>
    </FullNameWrapper>
  );
};

export default GroupCounts;
