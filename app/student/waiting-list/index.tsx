import React, { useMemo } from "react";
import { Wrapper, TabHeaderWrapper } from "./styled";
import { Divider } from "@mui/material";
import CreateStudent from "./components/createStudent";
import Table from "./components/table";
import { WaitingListFilterWrapper } from "./components/filter/style";
import Filter from "./components/filter";
import { useAdminStudentList, usePageDataMemo } from "hooks";
import { useRouter } from "next/router";
import { useUserLabelSelect } from "utils/functions/userLabelSelect";
import { labelOptions, RoundedTab } from "components";
import { waitingListTabs } from "./components/tabs";
import { expand } from "./expand";
import { bgColors } from "styles/theme";
import { EStudentMatchType } from "types/student/waitingList";
import { STUDENT_STATUS_WAITING_LIST } from "constants/studentStatuses";
import { IStyles } from "../../../components/common/roundedTab/type";

const allStyles: IStyles = {
  bgColor: bgColors.magenta,
  boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
};
const WaitingList = () => {
  const router = useRouter();
  const query = router.query;
  const selects = usePageDataMemo();
  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      selects?.waitingStudentLabels.some(
        (label) => label.value == option.value,
      ),
    ),
  );

  const { data, isLoading, isPreviousData } = useAdminStudentList({
    query_params: {
      expand,
      recommended_status: EStudentMatchType.FULL,
      status: STUDENT_STATUS_WAITING_LIST,
      ...query,
      ...filters,
      "per-page": query.pageSize,
      pageSize: undefined,
    },
    enabled: !selects.isFetching,
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
            <div>
              <CreateStudent count={data?.meta?.totalCount} />
            </div>
          ),
          isClickable: true,
          query: {
            recommended_status: currentTab.type,
            pageSize: router.query?.pageSize || 20,
          },
        },
      ];
    }
    return array;
  }, [data, isLoading, isPreviousData]);

  return (
    <Wrapper>
      <WaitingListFilterWrapper>
        <Filter />
      </WaitingListFilterWrapper>
      <div className="sectionTable">
        <RoundedTab
          tabs={tabs}
          containerStyle={{ backgroundColor: bgColors.magenta }}
          allStyles={allStyles}
        />
        <Divider />
        <Table
          data={data}
          isLoading={isLoading}
          isPreviousData={isPreviousData}
        />
      </div>
    </Wrapper>
  );
};

export default WaitingList;
