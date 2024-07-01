import React from "react";
import { GroupWrapper } from "./style";
import {
  ByAverageAmount,
  ByBranch,
  ByGroupsStatuses,
  ByGroupType,
  ByLessonDay,
  ByLevel,
  BySubLevel,
  ByTime,
} from "./cards";
import Statistics from "./statistics";
import ByActiveGroupsStatuses from "./cards/byActiveGroups";

const Group = () => {
  return (
    <GroupWrapper>
      <Statistics />
      <ByAverageAmount />
      <ByGroupsStatuses />
      <ByActiveGroupsStatuses />
      <ByGroupType />
      <ByLessonDay />
      <ByTime />
      <ByLevel />
      <BySubLevel />
      <ByBranch />
    </GroupWrapper>
  );
};

export default Group;
