import React, { useMemo } from "react";
import { WaitingListWrapper, PaddingWrapper } from "./style";
import Table from "./components/table";
import { AddToGroupModal } from "globals/components";
import { WaitingListFilterWrapper } from "app/student/waiting-list/components/filter/style";
import { useAdminStudentList, useGroup, usePageDataMemo } from "hooks";
import { expand } from "./expand";
import { expand as groupExpand } from "../expand";
import { useRouter } from "next/router";
import Filter from "./components/filter";
import {
  GroupInsideHeaderInfo,
  labelOptions,
  RedBadgeTitle,
  RoundedTab,
} from "components";
import { useUserLabelSelect } from "utils/functions/userLabelSelect";
import { waitingListTabs } from "./components/tabs";
import { TabHeaderWrapper } from "./style";
import { EStudentMatchType } from "types/student/waitingList";
import { STUDENT_STATUS_WAITING_LIST } from "constants/studentStatuses";
import { bgColors } from "styles/theme";
import { IStyles } from "../../../../components/common/roundedTab/type";

const allStyles: IStyles = {
  bgColor: bgColors.magenta,
  boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
};

const StudentRecommendation = () => {
  const router = useRouter();

  const { data: group } = useGroup({
    id: router.query.groupId,
    expand: groupExpand,
  });

  const query = router.query;
  const { groupId, ...args } = query;
  const { waitingStudentLabels, flatLevels } = usePageDataMemo();
  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      waitingStudentLabels.some((label) => label.value == option.value),
    ),
  );

  const recommended_status =
    (router.query?.recommended_status as unknown as EStudentMatchType) ??
    EStudentMatchType.FULL;

  const { data, isLoading, isPreviousData } = useAdminStudentList({
    query_params: {
      expand,
      recommended_status,
      status: STUDENT_STATUS_WAITING_LIST,
      ...filters,
    },
    body: {
      // groupType: group?.group_type_id,
      // course_id: group?.course?.id,
      // level_id: [
      //   group?.featureLevel?.id!,
      //   getNextLevel({ id: group?.featureLevel?.id, flatLevels })!,
      // ],
      ...query,
    },
  });

  const tabs = useMemo(() => {
    let array: any = [];
    for (let i = 0; i < waitingListTabs.length; i++) {
      const currentTab = waitingListTabs[i];
      array = [
        ...array,
        {
          title: (isActive: boolean) => (
            <TabHeaderWrapper
              isActive={isActive}
              style={{
                boxShadow: isActive ? "0 0 6px rgba(0, 0, 0, 0.45)" : "",
                backgroundColor: isActive
                  ? currentTab.activeColor
                  : currentTab.inactiveColor,
              }}
            >
              <div
                className="flex"
                style={{
                  color:
                    currentTab.type == EStudentMatchType.PARTIAL
                      ? bgColors.sceptreBlue
                      : "unset",
                }}
              >
                <p>{currentTab.title}</p>
                {data?.tabs?.[currentTab.type] && (
                  <p>({data?.tabs?.[currentTab.type]})</p>
                )}
              </div>
            </TabHeaderWrapper>
          ),
          children: (
            <PaddingWrapper>
              <div className="badge">
                <RedBadgeTitle
                  title="Recommended students"
                  count={data?.meta?.totalCount}
                />
              </div>
            </PaddingWrapper>
          ),
          isClickable: true,
          query: {
            recommended_status: currentTab.type,
          },
        },
      ];
    }
    return array;
  }, [data, isLoading, isPreviousData]);

  return (
    <WaitingListWrapper>
      <AddToGroupModal />
      <div className="group-info">
        <GroupInsideHeaderInfo group={group} />
      </div>
      <WaitingListFilterWrapper>
        <Filter recommendationExceptions={["groupId"]} />
      </WaitingListFilterWrapper>
      <div className="sectionTable">
        <RoundedTab
          tabs={tabs}
          containerStyle={{ backgroundColor: bgColors.magenta }}
          allStyles={allStyles}
        />

        <Table isLoading={isLoading || isPreviousData} data={data} />
      </div>
    </WaitingListWrapper>
  );
};

export default StudentRecommendation;
