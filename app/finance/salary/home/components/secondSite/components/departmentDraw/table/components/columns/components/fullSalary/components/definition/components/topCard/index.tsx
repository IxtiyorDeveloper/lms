import React, { FC } from "react";
import { Left, Top, Personal, Flex, Last, Position } from "./style";
import { CircleImage } from "components";
import { IDefinition } from "./type";
import { getGroupCounts } from "utils/getGroupCounts";
import BranchTag from "components/common/branchTag";
import { bgColors, textColors } from "styles/theme";

const TopCard: FC<IDefinition> = ({ record, data, isTeacher }) => {
  const value = record?.receiver?.userProfile;

  const name = value
    ? value?.fullName ?? value?.firstname + " " + value?.lastname
    : "-";

  const { groupCount, indCount } = getGroupCounts({
    groupCounts: record?.groupCounts,
  });

  const branch_id = record?.receiver?.branch_ids;
  const branch_assignment_type = record?.receiver?.branch_assignment_type;

  return (
    <Top>
      <Left>
        <CircleImage src={record?.receiver?.userProfile?.avatar} />
        <Personal isTeacher={isTeacher}>
          <p className="name">{name}</p>
          {isTeacher && (
            <Flex>
              {!!groupCount && <div className="box">Group: {groupCount}</div>}
              {!!indCount && <div className="box">Individual {indCount}</div>}
            </Flex>
          )}
        </Personal>
      </Left>
      <Last>
        <Position>{data?.role?.name}</Position>
        <BranchTag
          branches={branch_id}
          branch_assignment_type={branch_assignment_type}
          wrapperColor={bgColors.sceptreBlue}
          color={textColors.brilliance}
          popoverColor={textColors.brilliance}
          popoverBg={bgColors.sceptreBlue}
        />
      </Last>
    </Top>
  );
};

export default TopCard;
