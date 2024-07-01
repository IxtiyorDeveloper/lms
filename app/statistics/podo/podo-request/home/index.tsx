import React from "react";
import { TableWrapper, Wrapper } from "./style";
import PodoTop from "./components/top";
import TableComponent from "./components/table";
import PodoRequestModal from "globals/components/podoRequest";
import { useGetPodoRequestStatistics } from "hooks";
import { expand } from "./expand";
import { getMonthAndYear } from "utils/getFormattedDate";

const PodoReports = () => {
  const { month, year } = getMonthAndYear();

  const { data, isLoading } = useGetPodoRequestStatistics({
    query_params: {
      year,
      month,
      expand,
    },
  });

  return (
    <Wrapper>
      <PodoRequestModal />
      <PodoTop data={data} />
      <TableWrapper>
        <TableComponent data={data} isLoading={isLoading} />
      </TableWrapper>
    </Wrapper>
  );
};

export default PodoReports;
