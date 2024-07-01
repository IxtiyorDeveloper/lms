import React from "react";
import { TableHeading, SortSvg } from "components";
import { TimeSortWrapper } from "./style";
import { useRouter } from "next/router";

const OverallScoreSortHeader = () => {
  const router = useRouter();
  const status = !router.query.sort
    ? "none"
    : router.query.sort === "countObservations"
      ? "asc"
      : "desc";
  const handleClick = () => {
    router.replace({
      query: {
        ...router.query,
        sort:
          router.query.sort === "countObservations"
            ? "-countObservations"
            : "countObservations",
      },
    });
  };

  return (
    <TimeSortWrapper status={status} onClick={handleClick}>
      <TableHeading className="heading">
        Overall score
        <div className="arrow">
          <SortSvg />
        </div>
      </TableHeading>
    </TimeSortWrapper>
  );
};

export default OverallScoreSortHeader;
