import React from "react";
import { EditableTableWrapper } from "./style";
import { useCourse, usePageData } from "hooks";
import LevelPrice from "../levelPrice";
import { useRouter } from "next/router";
import { Empty } from "antd";
const PriceList = () => {
  const router = useRouter();
  const id = router?.query?.update_id;
  const {
    data: course,
    isLoading,
    isPreviousData,
  } = useCourse({
    query_params: {
      id,
      expand:
        "coursePrices,lessonTimes,lessonDays.lessonWeeks,parentLevels.children,groupTypes",
    },
  });
  const {
    data,
    isPreviousData: isPageDataLoading,
    isLoading: isPageDataPreviousData,
  } = usePageData();

  return (
    <EditableTableWrapper>
      {course?.parentLevels?.map((parentLevel, index) => {
        return (
          <LevelPrice
            course={course}
            id={parentLevel.id}
            index={index}
            parentLevel={parentLevel}
            data={data}
            isLoading={isLoading}
            isPreviousData={isPreviousData}
            isPageDataLoading={isPageDataLoading}
            isPageDataPreviousData={isPageDataPreviousData}
          />
        );
      }) ?? <Empty />}
    </EditableTableWrapper>
  );
};

export default PriceList;
