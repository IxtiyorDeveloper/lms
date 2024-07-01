import React from "react";
import { Box } from "@mui/material";
import Table from "./components/table";
import { Wrapper } from "../waiting-list/styled";
import WaitingListFilter from "../waiting-list/components/filter";
import { useRouter } from "next/router";
import { useBannedStudentLists } from "hooks";
import { PodoCount } from "./components/table/style";
import { RedBadgeTitle } from "components";

const BannedStudents = () => {
  const router = useRouter();
  const query = router.query;
  const { isLoading, data, isPreviousData } = useBannedStudentLists(query);
  return (
    <Wrapper>
      <div className="filter-wrapper">
        <WaitingListFilter />
      </div>
      <Box className="sectionTable">
        <PodoCount>
          <RedBadgeTitle
            title="Banned Students"
            count={data?.meta?.totalCount}
          />
        </PodoCount>
        <Table data={data} isLoading={isLoading || isPreviousData} />
      </Box>
    </Wrapper>
  );
};

export default BannedStudents;
