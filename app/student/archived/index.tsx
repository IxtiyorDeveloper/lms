import React from "react";
import { labelOptions, RoundedTab, TableSkeleton } from "components";
import { bgColors } from "styles/theme";
import { UpdateStudentFlow } from "globals/components";
import { WaitingListFilterWrapper } from "./components/filter/style";
import FilterComponent from "./components/filter";
import { useArchivedStudents, usePageDataMemo } from "hooks";
import { expand } from "./expand";
import { useRouter } from "next/router";
import Tabs from "./components/tabs";
import { StyledBox } from "./style";
import { useUserLabelSelect } from "utils/functions/userLabelSelect";
import { StudentType } from "types";

const ArchiveStudents = () => {
  const router = useRouter();
  const { page, pageSize, ...rest } = router.query;
  const { archivedStudentLabels } = usePageDataMemo();
  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      archivedStudentLabels.some((label) => label.value == option.value)
    )
  );
  const { data, isLoading, isPreviousData } = useArchivedStudents({
    query_params: {
      expand,
      page,
      pageSize,
    },
    body: {
      ...rest,
      ...filters,
      type: rest?.dont_show
        ? [StudentType.TYPE_NEW, StudentType.TYPE_OLD]
        : undefined,
      dont_show: undefined,
    },
  });

  return (
    <div className="archived">
      <UpdateStudentFlow />
      <WaitingListFilterWrapper>
        <FilterComponent />
      </WaitingListFilterWrapper>
      <StyledBox>
        {isLoading && !data && <TableSkeleton />}
        <RoundedTab
          tabs={Tabs({ data, isLoading: isLoading || isPreviousData })}
          containerStyle={{ backgroundColor: bgColors.whiteSmoke }}
        />
      </StyledBox>
    </div>
  );
};

export default ArchiveStudents;
