import React from "react";
import { TableWrapper, Wrapper } from "./style";
import PotentialTop from "./components/top";
import TableComponent from "./components/table";
import { usePotentialFailRequests } from "hooks";
import { expand } from "./expand";
import { getMonthAndYear } from "utils/getFormattedDate";
import PotentialFailRequestModal from "globals/components/potentialFailRequest";

const PotentialFailRequest = () => {
  const { month, year } = getMonthAndYear();

  const { data, isLoading } = usePotentialFailRequests({
    query_params: {
      year,
      month,
      expand,
    },
  });

  return (
    <Wrapper>
      <PotentialFailRequestModal />
      <PotentialTop data={data} />
      <TableWrapper>
        <TableComponent data={data} isLoading={isLoading} />
      </TableWrapper>
    </Wrapper>
  );
};

export default PotentialFailRequest;
