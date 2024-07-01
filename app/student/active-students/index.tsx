import React, {useMemo} from "react";
import {labelOptions, RoundedTab} from "components";
import {TabHeaderWrapper, Wrapper, StyledBox} from "./style";
import MessageFilter from "./components/messageFilter";
import {bgColors} from "styles/theme";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import {useRouter} from "next/router";
import {useActiveStudents, usePageDataMemo} from "hooks";
import Table from "./components/table";
import {WaitingListFilterWrapper} from "./components/filter/style";
import FilterComponent from "./components/filter";
import {useUserLabelSelect} from "utils/functions/userLabelSelect";
import StoppingStatusChangeModal from "../../../globals/components/stoppingStatusChange";
import {expand} from "./expand";

const activeStudentTabs = [
  {
    title: "Studying",
    type: STUDYING_STUDENT,
    inactiveColor: bgColors.midori,
    activeColor: bgColors.serengeti,
    columns: [
      "name",
      "phone",
      "period",
      "lesson",
      "payment_info",
      "group_info",
      "note",
      "label",
      "actions",
    ],
  },
  {
    title: "Transferring",
    type: TRANSFERRING_STUDENT,
    inactiveColor: bgColors.deep,
    activeColor: bgColors.kitten,
    columns: [
      "name",
      "phone",
      "period",
      "lesson",
      "payment_info",
      "group_info",
      "note",
      "label",
      "actions",
    ],
  },
  {
    title: "Stopping",
    type: STOPPING_STUDENT,
    inactiveColor: bgColors.pop,
    activeColor: bgColors.pepper,
    columns: [
      "name",
      "phone",
      "period",
      "lesson",
      "payment_info",
      "group_info",
      "note",
      "where",
      "label",
      "actions",
    ],
  },
];
const ActiveStudents = () => {
  const router = useRouter();
  const {activeStudentLabels} = usePageDataMemo();
  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      activeStudentLabels.some((label) => label.value == option.value),
    ),
  );
  const isStopping = router.query?.roundedTabIndex?.toString() == "2";

  const queries = useMemo(() => {
    if (!isStopping) {
      const {color, ...rest} = router.query;
      return rest;
    } else {
      return {
        ...router.query,
        user_label_type: router.query?.user_label_type_stopping,
      };
    }
  }, [isStopping, router.query]);

  const activeTab = router.query?.status || STUDYING_STUDENT;

  const {isLoading, data, isPreviousData} = useActiveStudents({
    ...queries,
    status: activeTab,
    paymentCheckAfterCreate: undefined,
    ...filters,
  });

  const tabs = useMemo(() => {
    let array: any = [];
    for (let i = 0; i < activeStudentTabs.length; i++) {
      const currentTab = activeStudentTabs[i];
      array = [
        ...array,
        {
          title: (isActive: boolean) => (
            <TabHeaderWrapper
              isActive={isActive}
              style={{
                boxShadow: isActive ? "0 0 6px rgba(0, 0, 0, 0.45)" : "",
                backgroundColor: !isActive
                  ? currentTab.activeColor
                  : currentTab.inactiveColor,
              }}
            >
              <div className="flex">
                <p>{currentTab.title}</p>
                {data?.tabs?.[currentTab.type] && (
                  <p>({data?.tabs?.[currentTab.type]})</p>
                )}
              </div>
            </TabHeaderWrapper>
          ),
          children: (
            <div className="white">
              <MessageFilter status={currentTab.type as any}/>
            </div>
          ),
          isClickable: true,
          query: {
            status: currentTab.type,
          },
        },
      ];
    }
    return array;
  }, [isLoading, isPreviousData, data]);

  const current = activeStudentTabs?.find((f) => f.type == activeTab);

  return (
    <Wrapper>
      <StoppingStatusChangeModal/>
      <WaitingListFilterWrapper>
        <FilterComponent/>
      </WaitingListFilterWrapper>
      <StyledBox>
        <RoundedTab
          tabs={tabs}
          containerStyle={{backgroundColor: bgColors.whiteSmoke}}
        />
        <div className="white">
          <Table
            data={data}
            isLoading={isLoading || isPreviousData}
            columns={current?.columns}
          />
        </div>
      </StyledBox>
    </Wrapper>
  );
};

export default ActiveStudents;
