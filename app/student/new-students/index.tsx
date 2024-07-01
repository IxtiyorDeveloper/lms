import React, { useMemo } from "react";
import {
  AttendSvg,
  ColoredAttendSvg,
  labelOptions,
  RoundedTab,
} from "components";
import { TabHeaderWrapper } from "./style";
import { bgColors } from "styles/theme";
import { Box } from "@mui/material";
import MessageFilter from "./components/messageFilter";
import Table from "./components/table";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
} from "constants/studentStatuses";
import { useRouter } from "next/router";
import { useNewStudentLists, usePageDataMemo } from "hooks";
import FilterComponent from "./components/filter";
import { WaitingListFilterWrapper } from "./components/filter/style";
import { useUserLabelSelect } from "utils/functions/userLabelSelect";

const NewStudents = () => {
  const router = useRouter();
  const { newStudentLabels } = usePageDataMemo();
  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      newStudentLabels.some((label) => label.value == option.value)
    )
  );
  const { isLoading, isPreviousData, data } = useNewStudentLists({
    ...router.query,
    status: router.query.status || 100,
    ...filters,
  });

  const tabs = useMemo(
    () => [
      {
        title: (isActive: boolean) => (
          <TabHeaderWrapper isActive={isActive}>
            <div className="flex">
              <AttendSvg
                width="20px"
                height="20px"
                color={isActive ? bgColors.blueGray : bgColors.yourShadow}
              />
              <p>Not Attended</p>
              {data?.tabs?.[NEW_STUDENT_NOT_ATTENDED] && (
                <p>({data?.tabs?.[NEW_STUDENT_NOT_ATTENDED]})</p>
              )}
            </div>
          </TabHeaderWrapper>
        ),
        children: (
          <div style={{ backgroundColor: "white" }}>
            <MessageFilter status={NEW_STUDENT_NOT_ATTENDED} />
            <Table data={data} isLoading={isLoading || isPreviousData} />
          </div>
        ),
        query: {
          status: 100,
        },
        isClickable: true,
      },
      {
        title: (isActive: boolean) => {
          return (
            <TabHeaderWrapper isActive={isActive}>
              <div className="flex">
                <ColoredAttendSvg
                  width="20px"
                  height="20px"
                  color={isActive ? bgColors.blueGray : bgColors.yourShadow}
                />
                <p>Attended</p>
                {data?.tabs?.[NEW_STUDENT_ATTENDED] && (
                  <p>({data?.tabs?.[NEW_STUDENT_ATTENDED]})</p>
                )}
              </div>
            </TabHeaderWrapper>
          );
        },
        children: (
          <div style={{ backgroundColor: "white" }}>
            <MessageFilter status={NEW_STUDENT_ATTENDED} />
            <Table data={data} isLoading={isLoading || isPreviousData} />
          </div>
        ),
        query: {
          status: 200,
        },
        isClickable: true,
      },
    ],
    [isLoading, isPreviousData, isLoading, router.query, data]
  );

  return (
    <div>
      <WaitingListFilterWrapper>
        <FilterComponent />
      </WaitingListFilterWrapper>
      <Box mx="40px" mt="11px" overflow="hidden">
        <RoundedTab tabs={tabs} />
      </Box>
    </div>
  );
};

export default NewStudents;
