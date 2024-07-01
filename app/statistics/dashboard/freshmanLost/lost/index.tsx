import React from "react";
import { RedBadgeTitle, RoundedTab, TableSkeleton } from "components";
import { bgColors } from "styles/theme";
import Tabs from "./tabs";
import { UpdateStudentFlow } from "globals/components";
import { WaitingListFilterWrapper } from "app/student/archived/components/filter/style";
import FilterComponent from "app/student/archived/components/filter";
import { useRouter } from "next/router";
import { useLostList } from "hooks";
import { Wrapper } from "./style";

const LostArchiveStudents = () => {
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useLostList({
    body: {
      ...router.query,
      tab_id: router.query?.tab_id || -700,
    },
    query_params: {
      page: router.query?.page,
      pageSize: router.query?.pageSize,
      expand:
        "currentGroupContact,buttonActions,user.userLabels.createdBy,permissionLabels,lastStudentFlow.leavingCategory,user.userPhones,user.userProfile.avatar.children,lastStudentFlow.group.groupType,lastStudentFlow.group.room,lastStudentFlow.group.level.parent,lastStudentFlow.group.lessonDay,lastStudentFlow.group.groupMentors.user,permissionActions,lastStudentFlow.group.lessonTime",
    },
  });

  const sum = Object.values(data?.tabs || {}).reduce(
    (acc, value) => acc + parseInt(String(value)),
    0,
  );

  return (
    <div>
      <UpdateStudentFlow />
      <WaitingListFilterWrapper>
        <FilterComponent />
      </WaitingListFilterWrapper>
      <Wrapper>
        <div className="badge">
          <RedBadgeTitle title="Losts" count={sum} />
        </div>
        {isLoading && !data && <TableSkeleton />}
        <RoundedTab
          tabs={Tabs({ data, isLoading: isLoading || isPreviousData })}
          containerStyle={{ backgroundColor: bgColors.whiteSmoke }}
          tabName="roundedTabIndex"
        />
      </Wrapper>
    </div>
  );
};

export default LostArchiveStudents;
