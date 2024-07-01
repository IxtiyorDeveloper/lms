import React from "react";
import { GroupStatusWrapper } from "./style";
import { IGroup } from "types";
import { groupColors } from "layout/header/style";
import { groupStatusIdentifier } from "utils/groupStatusIdentifier";

const GroupStatus = ({ group }: { group: IGroup }) => {
  return (
    <GroupStatusWrapper
      style={
        groupColors[
          groupStatusIdentifier({
            group,
          }) as keyof typeof groupColors
        ]
      }
    ></GroupStatusWrapper>
  );
};

export default GroupStatus;
