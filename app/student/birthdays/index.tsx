import React from "react";
import { Wrapper } from "./styled";
import { Divider } from "@mui/material";
import CreateStudent from "./components/createStudent";
import Table from "./components/table";
import { useDOBList } from "hooks";

const WaitingList = () => {
  const { isInitialLoading, isPreviousData, data } = useDOBList();

  return (
    <Wrapper>
      <div className="sectionTable">
        <div>
          <CreateStudent count={data?.length} />
        </div>
        <Divider />
        <Table data={data} isLoading={isPreviousData || isInitialLoading} />
      </div>
    </Wrapper>
  );
};

export default WaitingList;
