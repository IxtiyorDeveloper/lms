import React, { FC } from "react";
import { StatisticsCollapse, WaitingListWrapper, Wrapper } from "./style";
import { RoundedTab } from "components";
import { bgColors } from "styles/theme";
import { useGroupList, useInitialGroupPage } from "hooks";
import { DeleteGroup, GroupModal, TakeGroup } from "globals/components";
import { FilterWrapper } from "./components/filter/style";
import FilterComponent from "./components/filter";
import GroupTable from "./components/groupTable";
import { useRouter } from "next/router";
import Tabs from "./components/tabs";
import LifeCycleModal from "./components/lifeCycleModal";
import ChangeTeacherModal from "globals/components/changeTeacherModal";
import { group_expand } from "./expands";
import ResponsibleStaffModal from "globals/components/responsibleStaff";
import DeleteResponsible from "globals/components/deleteResponsible";
import Statistics from "./components/statistics";

const allStyles = {
  bgColor: bgColors.hat,
};
const Groups: FC = () => {
  const { isLoading, data } = useInitialGroupPage();
  const router = useRouter();
  const { page, tab_id, with_tabs, pageSize, sort, ...queries } = router.query;

  const { data: listData, isLoading: isGroupLoading } = useGroupList({
    query_params: {
      expand: group_expand,
      page: page || 1,
      pageSize: pageSize || 20,
      sort,
    },
    body: {
      ...queries,
      tab_id: tab_id || 100,
      with_tabs: with_tabs || 1,
      enabled: true,
      teacherType: undefined,
    },
  });

  return (
    <WaitingListWrapper>
      <GroupModal />
      <TakeGroup />
      <DeleteResponsible />
      <ResponsibleStaffModal />
      <DeleteGroup />
      <Wrapper>
        <FilterWrapper>
          <FilterComponent />
        </FilterWrapper>
        <StatisticsCollapse>
          <Statistics />
        </StatisticsCollapse>
        <div className="tabs">
          <RoundedTab
            tabs={Tabs({
              data,
              isLoading: isLoading || isGroupLoading,
              listData,
            })}
            containerStyle={{ backgroundColor: bgColors.hat }}
            allStyles={allStyles}
          />
          <GroupTable isLoading={isLoading || isGroupLoading} data={listData} />
        </div>
      </Wrapper>
      <LifeCycleModal />
      <ChangeTeacherModal />
    </WaitingListWrapper>
  );
};

export default Groups;
