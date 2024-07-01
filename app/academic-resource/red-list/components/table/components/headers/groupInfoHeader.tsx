import React, { useState } from "react";
import { TableHeading, ThinArrowRight } from "components";
import { HeaderWrapper } from "./style";
import { useQueryClient } from "@tanstack/react-query";
import { IRedList } from "types/absentStudents";
import { RedListSort } from "./type";
import { queryKeys } from "constants/queryKeys";

const GroupInfoHeader = () => {
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<"none" | "asc" | "desc">("none");
  const handleClick = () => {
    if (status == RedListSort.ASC) {
      queryClient.setQueriesData([queryKeys.redList], (data) => {
        const firstData = data as { list: IRedList[] };
        return {
          ...firstData,
          list: firstData?.list?.slice().sort((a, b) => {
            return (
              Number(b.group?.redListCount) - Number(a.group?.redListCount)
            );
          }),
        };
      });
      setStatus(RedListSort.DESC);
    }
    if (status == RedListSort.DESC) {
      queryClient.setQueriesData([queryKeys.redList], (data) => {
        const firstData = data as { list: IRedList[] };
        return {
          ...firstData,
          list: firstData?.list?.slice().sort((a, b) => {
            return (
              Number(a.group?.redListCount) - Number(b.group?.redListCount)
            );
          }),
        };
      });
      setStatus(RedListSort.ASC);
    }
    if (status == RedListSort.NONE) {
      queryClient.setQueriesData([queryKeys.redList], (data) => {
        const firstData = data as { list: IRedList[] };
        return {
          ...firstData,
          list: firstData?.list?.sort((a, b) => {
            return (
              Number(b.group?.redListCount) - Number(a.group?.redListCount)
            );
          }),
        };
      });
      setStatus(RedListSort.ASC);
    }
  };

  return (
    <HeaderWrapper status={status} onClick={handleClick}>
      <TableHeading className="heading">
        Group info
        <div className="arrow">
          <ThinArrowRight />
        </div>
      </TableHeading>
    </HeaderWrapper>
  );
};

export default GroupInfoHeader;
